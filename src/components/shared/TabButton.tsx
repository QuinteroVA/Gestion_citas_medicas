type TabButtonProps<T extends string> = {
  label: string;
  value: T;
  active: T;
  icon?: string;
  onChange: (value: T) => void;
};

/**
 * Botón de pestaña genérico. */
export function TabButton<T extends string>({
  label,
  value,
  active,
  icon,
  onChange,
}: TabButtonProps<T>) {
  const isActive = active === value;

  return (
    <button
      onClick={() => onChange(value)}
      className={
        isActive
          ? 'flex h-12 items-center justify-center gap-2 bg-teal-600 text-sm font-semibold text-white'
          : 'flex h-12 items-center justify-center gap-2 bg-slate-50 text-sm text-slate-600 hover:bg-slate-100'
      }
    >
      {icon && <i className={icon} />}
      {label}
    </button>
  );
}
