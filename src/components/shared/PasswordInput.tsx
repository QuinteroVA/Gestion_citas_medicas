import { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Clases extra aplicadas al <input> */
  inputClassName?: string;
  /** Muestra el icono de candado a la izquierda (usado en LoginView) */
  withLockIcon?: boolean;
  required?: boolean;
};

/**
 * Campo de contraseña reutilizable con botón para mostrar/ocultar.
 * Usado en: LoginView, UsersTab, CredentialsTab.
 */
export function PasswordInput({
  value,
  onChange,
  placeholder = "Contraseña",
  inputClassName = "",
  withLockIcon = false,
  required = false,
}: PasswordInputProps) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="relative">
      {/* Icono candado izquierdo (solo LoginView) */}
      {withLockIcon && (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <i className="iconoir-lock" />
        </span>
      )}

      <input
        type={showPass ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 pr-10 text-sm ${inputClassName}`}
      />

      {/* Botón ojo derecho */}
      <button
        type="button"
        onClick={() => setShowPass((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
        aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        <i className={showPass ? "iconoir-eye-solid" : "iconoir-eye-closed"} />
      </button>
    </div>
  );
}