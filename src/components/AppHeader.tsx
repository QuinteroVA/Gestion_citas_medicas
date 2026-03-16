import type { User, View } from "../types";

type AppHeaderProps = {
  currentUser: User;
  isAdmin: boolean;
  view: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
};

export function AppHeader({ currentUser, isAdmin, view, onViewChange, onLogout }: AppHeaderProps) {
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center">
            <img src="/image/agenda.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold leading-none">Agendamiento</h1>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <nav className="flex items-center gap-5 border-r border-slate-200 pr-4">
            <button className={view === "inicio" ? "font-semibold text-teal-600" : "text-slate-700"} onClick={() => onViewChange("inicio")}>
              Inicio
            </button>
            <button className={view === "registro" ? "font-semibold text-teal-600" : "text-slate-700"} onClick={() => onViewChange("registro")}>
              Registro de Citas
            </button>
            <button className={view === "reportes" ? "font-semibold text-teal-600" : "text-slate-700"} onClick={() => onViewChange("reportes")}>
              Reportes
            </button>
            {isAdmin && (
              <button
                className={view === "administracion" ? "font-semibold text-teal-600" : "text-slate-700"}
                onClick={() => onViewChange("administracion")}
              >
                Administración
              </button>
            )}
          </nav>
          <div>
            <p className="text-xs text-slate-500">Usuario</p>
            <p className="font-semibold">{currentUser.username}</p>
          </div>
          <button onClick={onLogout} className="rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white">
            <i className="fa fa-sign-out"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}