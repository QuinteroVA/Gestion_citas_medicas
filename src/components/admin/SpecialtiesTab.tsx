import type { FormEvent } from "react";
import type { Specialty } from "../../types";

type SpecialtiesTabProps = {
  specialties: Specialty[];
  newSpecialty: string;
  onNewSpecialtyChange: (v: string) => void;
  onAddSpecialty: (e: FormEvent) => void;
  onRemoveSpecialty: (id: string) => void;
};

export function SpecialtiesTab({ specialties, newSpecialty, onNewSpecialtyChange, onAddSpecialty, onRemoveSpecialty }: SpecialtiesTabProps) {
  return (
    <div className="space-y-4">
      <form onSubmit={onAddSpecialty} className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={newSpecialty} onChange={(e) => onNewSpecialtyChange(e.target.value)} placeholder="Nombre de especialidad" className="h-10 rounded-lg border border-slate-300 px-3" required />
        <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm text-white hover:bg-teal-700">
          <i className="fa fa-check-square-o mr-1" /> Agregar
        </button>
      </form>
      <ul className="space-y-2">
        {specialties.map((s) => (
          <li key={s.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-1">
            <span>{s.name}</span>
            <button onClick={() => onRemoveSpecialty(s.id)} className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-semibold text-white hover:bg-rose-600">
              <i className="fa fa-trash mr-1" /> Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}