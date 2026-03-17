Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

projectPath = fso.GetParentFolderName(WScript.ScriptFullName)
psScript = projectPath & "\Agendamiento.ps1"

shell.Run "powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & psScript & """", 0, False