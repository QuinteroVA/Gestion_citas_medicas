type TabButtonProps<T extends string> = {
  label: string;
  value: T;
  active: T;
  onChange: (value: T) => void;
};

/**
 * Botón de pestaña genérico. Elimina la lógica ternaria repetida
 * en AdminView para cada botón de navegación.
 */
export function TabButton<T extends string>({ label, value, active, onChange }: TabButtonProps<T>) {
  return (
    <button
      onClick={() => onChange(value)}
      className={
        active === value
          ? "h-12 bg-teal-600 text-sm font-semibold text-white"
          : "h-12 bg-slate-50 text-sm text-slate-700 hover:bg-slate-100"
      }
    >
      {label}
    </button>
  );
}
