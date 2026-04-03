type NavButtonProps<T extends string> = {
  label: string;
  value: T;
  active: T;
  onClick: (value: T) => void;
};

export function NavButton<T extends string>({ label, value, active, onClick }: NavButtonProps<T>) {
  return (
    <button
      className={active === value ? "font-semibold text-teal-600" : "text-slate-700 hover:text-teal-600"}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
