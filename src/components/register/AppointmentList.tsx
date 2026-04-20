import type { Appointment, Specialty } from "../../types";

type AppointmentListProps = {
  listDate: string;
  listSpecialty: string;
  specialties: Specialty[];
  availableAppointments: Appointment[];
  specialtyName: (id: string) => string;
  doctorName: (id: string) => string;
  onListDateChange: (value: string) => void;
  onListSpecialtyChange: (value: string) => void;
  onToggleStatus: (id: string) => void;
};

const inputClass = "h-10 rounded-md border border-slate-300 px-3 text-sm";
const labelClass = "mt-3 grid gap-1 text-xs font-semibold text-slate-700";

export function AppointmentList({
  listDate, listSpecialty, specialties, availableAppointments,
  specialtyName, doctorName, onListDateChange, onListSpecialtyChange, onToggleStatus,
}: AppointmentListProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
      <h3 className="text-xl font-bold">Citas Agendadas</h3>

      <label className={labelClass}>
        Filtrar por Fecha
        <input type="date" value={listDate} onChange={(e) => onListDateChange(e.target.value)} className={inputClass} />
      </label>

      <label className={labelClass}>
        Filtrar por Especialidad
        <select value={listSpecialty} onChange={(e) => onListSpecialtyChange(e.target.value)} className={inputClass}>
          <option value="all">Todas las especialidades</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </label>

      <div className="mt-4 space-y-2">
        {availableAppointments.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">No hay citas registradas</p>
        ) : (
          availableAppointments.map((a) => (
            <div key={a.id} className="rounded-lg border border-slate-200 p-2">
              <div className="flex items-start justify-between">
                <p className="font-bold">{a.patientName}</p>
                <p className="text-xl font-bold text-cyan-700">{a.time}</p>
                <button
                  type="button"
                  onClick={() => onToggleStatus(a.id)}
                  className={
                    a.status === "atendida"
                      ? "inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2 py-1 text-sm font-semibold text-white"
                      : "inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1 text-sm font-semibold text-slate-900"
                  }
                >
                  <i className={`fa ${a.status === "atendida" ? "fa-check-square" : "fa-square-o"}`} />
                  {a.status === "atendida" ? "Atendida" : "Pendiente"}
                </button>
              </div>

              <div className="mt-1 flex items-center justify-between text-sm">
                <span>{a.documentType === "cedula" ? "Céd" : "Psprt"}: {a.documentNumber}</span>
                <span>{specialtyName(a.specialtyId)}</span>
                <span>{doctorName(a.doctorId)}</span>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                {new Date(`${a.date}T12:00:00`).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}