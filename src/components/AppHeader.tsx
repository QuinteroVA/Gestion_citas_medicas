import type { User, View } from "../types";
import { NavButton } from "./shared/NavButton";

type AppHeaderProps = {
  currentUser: User;
  isAdmin: boolean;
  view: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
};

const NAV_ITEMS: { label: string; value: View }[] = [
  { label: "Inicio", value: "inicio" },
  { label: "Registro de Citas", value: "registro" },
  { label: "Reportes", value: "reportes" },
];

export function AppHeader({ currentUser, isAdmin, view, onViewChange, onLogout }: AppHeaderProps) {
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/image/agenda.png" alt="Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold leading-none">Agendamiento</h1>
        </div>

        {/* Navegación + usuario + logout */}
        <div className="flex items-center gap-5 text-sm">
          <nav className="flex items-center gap-5 border-r border-slate-200 pr-4">
            {NAV_ITEMS.map((item) => (
              <NavButton key={item.value} {...item} active={view} onClick={onViewChange} />
            ))}
            {isAdmin && (
              <NavButton label="Administración" value="administracion" active={view} onClick={onViewChange} />
            )}
          </nav>

          <div>
            <p className="text-xs text-slate-500">Usuario</p>
            <p className="font-semibold">{currentUser.username}</p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-600"
          >
            <i className="fa fa-sign-out mr-1" /> Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
