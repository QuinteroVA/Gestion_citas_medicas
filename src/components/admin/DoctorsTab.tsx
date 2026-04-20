import type { FormEvent } from "react";
import type { Doctor, Specialty } from "../../types";

type DoctorsTabProps = {
  doctors: Doctor[];
  specialties: Specialty[];
  newDoctor: string;
  newDoctorSpecialty: string;
  specialtyName: (id: string) => string;
  onNewDoctorChange: (v: string) => void;
  onNewDoctorSpecialtyChange: (v: string) => void;
  onAddDoctor: (e: FormEvent) => void;
  onRemoveDoctor: (id: string) => void;
};

export function DoctorsTab({
  doctors, specialties, newDoctor, newDoctorSpecialty,
  specialtyName, onNewDoctorChange, onNewDoctorSpecialtyChange,
  onAddDoctor, onRemoveDoctor,
}: DoctorsTabProps) {
  return (
    <div className="space-y-4">
      <form onSubmit={onAddDoctor} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input
          value={newDoctor}
          onChange={(e) => onNewDoctorChange(e.target.value)}
          placeholder="Nombre del médico"
          className="h-10 rounded-lg border border-slate-300 px-3"
          required
        />
        <select
          value={newDoctorSpecialty}
          onChange={(e) => onNewDoctorSpecialtyChange(e.target.value)}
          className="h-10 rounded-lg border border-slate-300 px-3"
          required
        >
          <option value="">Seleccione especialidad</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm text-white hover:bg-teal-700">
          <i className="fa fa-check-square-o mr-1" /> Agregar médico
        </button>
      </form>

      <ul className="space-y-2">
        {doctors.map((d) => (
          <li key={d.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2">
            <span>{d.fullName} — {specialtyName(d.specialtyId)}</span>
            <button
              onClick={() => onRemoveDoctor(d.id)}
              className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-semibold text-white hover:bg-rose-600"
            >
              <i className="fa fa-trash mr-1" /> Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}