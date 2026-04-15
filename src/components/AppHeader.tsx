import { useState } from "react";
import type { User, View } from "../types";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = isAdmin
    ? [...NAV_ITEMS, { label: "Administración", value: "administracion" as View }]
    : NAV_ITEMS;

  const handleNav = (v: View) => {
    onViewChange(v);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
  };

  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3">
        {/* - Logo - */}
        <div className="flex items-center gap-3">
          <img src="/image/agenda.png" alt="Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-bold leading-none">Agendamiento</h1>
        </div>

        {/* ─ Navegación escritorio ─ */}
        <div className="hidden items-center gap-5 text-sm md:flex">
          <nav className="flex items-center gap-5 border-r border-slate-200 pr-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={
                  view === item.value
                    ? "font-bold text-teal-600 text-base drop-shadow-[0_1px_3px_rgba(13,148,136,0.6)]"
                    : "text-sm text-slate-500 hover:text-teal-600"
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div>
            <p className="text-xs text-slate-500">Usuario</p>
            <p className="font-semibold">{currentUser.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-600"
          >
            <i className="fa fa-sign-out mr-1" /> Cerrar sesión
          </button>
        </div>

        {/* ─ Botón hamburguesa móvil ─ */}
        <button
          className="flex flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ─ Menú desplegable móvil ─ */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          {/* Usuario */}
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <i className="fa fa-user-circle text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Usuario</p>
              <p className="text-sm font-semibold">{currentUser.username}</p>
            </div>
          </div>

          {/* Links de navegación */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNav(item.value)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  view === item.value
                    ? "bg-teal-50 font-semibold text-teal-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                }`}
              >
                {view === item.value && (
                  <i className="fa fa-chevron-right mr-2 text-xs text-teal-500" />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg bg-rose-500 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
          >
            <i className="fa fa-sign-out mr-1" /> Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}