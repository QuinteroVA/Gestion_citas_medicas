type NavButtonProps<T extends string> = {
  label: string;
  value: T;
  active: T;
  onClick: (value: T) => void;
};

export function NavButton<T extends string>({ label, value, active, onClick }: NavButtonProps<T>) {
  return (
    <button
      className={active === value 
  ? "font-bold text-teal-600 text-base drop-shadow-[0_1px_3px_rgba(13,148,136,0.6)]" 
  : "text-sm text-slate-500 hover:text-teal-600"}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}