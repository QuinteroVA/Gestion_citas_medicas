import { messageToneStyles } from "../../lib/db";
import type { MessageTone } from "../../types";

type InlineMessageProps = {
  message: string;
  tone: MessageTone;
  className?: string;
};

export function InlineMessage({ message, tone, className = "" }: InlineMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${messageToneStyles[tone]} ${className}`}
    >
      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          {tone === "success" ? (
            <path d="M20 6L9 17l-5-5" />
          ) : (
            <path d="M12 8v4m0 4h.01M10 3h4l7 7v4l-7 7h-4l-7-7v-4z" />
          )}
        </svg>
      </span>
      <p>{message}</p>
    </div>
  );
}
