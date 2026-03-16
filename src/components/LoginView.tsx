import type { FormEvent } from "react";

type LoginViewProps = {
  loginUser: string;
  loginPass: string;
  loginError: string;
  showInitialAccess: boolean;
  onUserChange: (value: string) => void;
  onPassChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export function LoginView({ loginUser, loginPass, loginError, showInitialAccess, onUserChange, onPassChange, onSubmit }: LoginViewProps) {
  return (
    <div className="min-h-screen bg-[#dff3f4] px-4 py-8 text-slate-900">
      <div className="mx-auto flex min-h-[88vh] max-w-[360px] flex-col items-center justify-center">
        <div className="mx-auto flex h-22 w-22 items-center justify-center">
          <img src="/image/hospital.png" alt="Logo" className="h-full w-full object-contain" />
        </div>
        <h1 className="mt-6 text-center text-[25px] font-bold leading-tight">Citas Médicas</h1>
        <p className="mt-2 text-center text-[14px] text-slate-600">Ingresa tus credenciales para continuar</p>
        <form onSubmit={onSubmit} className="mt-7 w-full rounded-2xl bg-slate-100 p-6 shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
          <label className="mb-4 grid gap-2 text-[14px] font-semibold text-slate-700">
            Usuario
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <i className="fa fa-user-o"></i>
              </span>
              <input
                value={loginUser}
                onChange={(e) => onUserChange(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </label>
          <label className="grid gap-2 text-[14px] font-semibold text-slate-700">
            Contraseña
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                value={loginPass}
                onChange={(e) => onPassChange(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-3 text-sm"
                placeholder="Ingresa tu contrasena"
                required
              />
            </div>
          </label>
          {loginError && <p className="mt-3 text-sm text-rose-600">{loginError}</p>}
          <button className="mt-5 h-10 w-full rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 text-sm font-semibold text-white shadow-md shadow-cyan-300/50 hover:from-teal-600 hover:to-cyan-600">
            Iniciar Sesión
          </button>
          {showInitialAccess && (
            <div className="mt-6 rounded-xl border border-cyan-300 bg-cyan-50 p-4 text-sm text-cyan-900">
              <p className="font-semibold">Acceso inicial</p>
              <p className="font-semibold">Usuario: admin</p>
              <p className="font-semibold">Contrasena: admin</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}