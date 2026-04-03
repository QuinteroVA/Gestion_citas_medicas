import { useEffect, useState } from "react";
import type { MessageTone } from "../types";

type Message = { text: string; tone: MessageTone };

/**
 * Hook para gestionar mensajes de feedback con auto-limpieza.
 * Evita duplicar la lógica de setTimeout en App.tsx.
 */
export function useMessage(timeoutMs = 5000) {
  const [msg, setMsg] = useState<Message>({ text: "", tone: "info" });

  useEffect(() => {
    if (!msg.text) return;
    const timer = window.setTimeout(() => setMsg((m) => ({ ...m, text: "" })), timeoutMs);
    return () => window.clearTimeout(timer);
  }, [msg.text, timeoutMs]);

  const showMsg = (text: string, tone: MessageTone) => setMsg({ text, tone });
  const clearMsg = () => setMsg((m) => ({ ...m, text: "" }));

  return { msg, showMsg, clearMsg };
}
