' Arranca el ayudante de impresion (print-helper.js) totalmente oculto,
' sin ninguna ventana de consola. Doble clic para probarlo a mano, o se
' lanza solo desde abrir-kiosco.bat.
Set fso = CreateObject("Scripting.FileSystemObject")
carpeta = fso.GetParentFolderName(WScript.ScriptFullName)

Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = carpeta
shell.Run "cmd /c node ""print-helper.js"" >> ""print-helper.log"" 2>&1", 0, False
