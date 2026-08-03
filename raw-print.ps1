<#
  CARL'S JR — Impresión RAW para tickets ESC/POS
  ═══════════════════════════════════════════════════════════════
  Por qué existe este script:
  El ticket incluye códigos de control ESC/POS (negrita, tamaño doble
  para el nombre y el número de pedido) para que la impresora térmica
  los interprete. El cmdlet Out-Printer NO sirve para esto: renderiza
  el texto como un dibujo con una fuente fija (GDI), así que esos
  códigos de control saldrían impresos como caracteres sueltos en vez
  de aplicar negrita o tamaño.

  La única forma de que la impresora reciba los bytes tal cual y los
  interprete como comandos es mandarlos en modo RAW, sin pasar por el
  renderizado de Windows. Este script hace exactamente eso usando las
  funciones de impresión de bajo nivel de Windows (winspool.drv).
  ═══════════════════════════════════════════════════════════════
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$FilePath
)

$ErrorActionPreference = 'Stop'

Add-Type -Namespace CarlsJrRawPrint -Name Helper -MemberDefinition @'
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct DOCINFOA {
    [MarshalAs(UnmanagedType.LPStr)] public string pDocName;
    [MarshalAs(UnmanagedType.LPStr)] public string pOutputFile;
    [MarshalAs(UnmanagedType.LPStr)] public string pDataType;
}

[DllImport("winspool.Drv", EntryPoint = "OpenPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool OpenPrinter(string szPrinter, out IntPtr hPrinter, IntPtr pd);

[DllImport("winspool.Drv", EntryPoint = "ClosePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool ClosePrinter(IntPtr hPrinter);

[DllImport("winspool.Drv", EntryPoint = "StartDocPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool StartDocPrinter(IntPtr hPrinter, int level, [In] ref DOCINFOA di);

[DllImport("winspool.Drv", EntryPoint = "EndDocPrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool EndDocPrinter(IntPtr hPrinter);

[DllImport("winspool.Drv", EntryPoint = "StartPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool StartPagePrinter(IntPtr hPrinter);

[DllImport("winspool.Drv", EntryPoint = "EndPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool EndPagePrinter(IntPtr hPrinter);

[DllImport("winspool.Drv", EntryPoint = "WritePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
public static extern bool WritePrinter(IntPtr hPrinter, byte[] pBytes, int dwCount, out int dwWritten);

public static bool SendBytesToPrinter(string printerName, byte[] bytes, out string error) {
    error = null;
    IntPtr hPrinter;
    DOCINFOA di = new DOCINFOA();
    di.pDocName = "Ticket Carl's Jr";
    di.pDataType = "RAW";

    if (!OpenPrinter(printerName, out hPrinter, IntPtr.Zero)) {
        error = "OpenPrinter fallo (codigo " + Marshal.GetLastWin32Error() + ")";
        return false;
    }
    try {
        if (!StartDocPrinter(hPrinter, 1, ref di)) {
            error = "StartDocPrinter fallo (codigo " + Marshal.GetLastWin32Error() + ")";
            return false;
        }
        try {
            if (!StartPagePrinter(hPrinter)) {
                error = "StartPagePrinter fallo (codigo " + Marshal.GetLastWin32Error() + ")";
                return false;
            }
            int written;
            bool ok = WritePrinter(hPrinter, bytes, bytes.Length, out written);
            EndPagePrinter(hPrinter);
            if (!ok) { error = "WritePrinter fallo (codigo " + Marshal.GetLastWin32Error() + ")"; }
            return ok;
        } finally {
            EndDocPrinter(hPrinter);
        }
    } finally {
        ClosePrinter(hPrinter);
    }
}
'@

$printerName = (Get-CimInstance -ClassName Win32_Printer -ErrorAction Stop |
  Where-Object { $_.Default -eq $true } |
  Select-Object -First 1 -ExpandProperty Name)

if (-not $printerName) {
  throw 'No hay ninguna impresora predeterminada configurada en Windows.'
}

$bytes = [System.IO.File]::ReadAllBytes($FilePath)

$errorMsg = $null
$ok = [CarlsJrRawPrint.Helper]::SendBytesToPrinter($printerName, $bytes, [ref]$errorMsg)

if (-not $ok) {
  throw "No se pudo enviar el ticket en modo RAW a '$printerName': $errorMsg"
}

Write-Output "OK: ticket enviado en modo RAW a '$printerName'"
