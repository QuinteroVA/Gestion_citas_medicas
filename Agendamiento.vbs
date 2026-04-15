Set objShell = CreateObject("WScript.Shell")
objShell.Run """" & Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\")) & "dev-all.bat""", 0, False
