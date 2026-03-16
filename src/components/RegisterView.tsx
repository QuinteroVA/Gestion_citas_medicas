import type { FormEvent } from "react";
import { tomorrowISO } from "../lib/data";
import { InlineMessage } from "./InlineMessage";
import type { Appointment, DocType, Doctor, MessageTone, Specialty } from "../types";

type RegisterViewProps = {
  docType: DocType;
  docNumber: string;
  patientName: string;
  apptDate: string;
  apptTime: string;
  apptSpecialty: string;
  apptDoctor: string;
  specialties: Specialty[];
  doctorsBySpecialty: Doctor[];
  listDate: string;
  listSpecialty: string;
  availableAppointments: Appointment[];
  registerMsg: string;
  registerMsgTone: MessageTone;
  specialtyName: (id: string) => string;
  doctorName: (id: string) => string;
  onDocTypeChange: (value: DocType) => void;
  onDocNumberChange: (value: string) => void;
  onPatientNameChange: (value: string) => void;
  onApptDateChange: (value: string) => void;
  onApptTimeChange: (value: string) => void;
  onApptSpecialtyChange: (value: string) => void;
  onApptDoctorChange: (value: string) => void;
  onListDateChange: (value: string) => void;
  onListSpecialtyChange: (value: string) => void;
  onCreate: (e: FormEvent) => void;
  onToggleStatus: (id: string) => void;
};

export function RegisterView(props: RegisterViewProps) {
  const {
    docType,
    docNumber,
    patientName,
    apptDate,
    apptTime,
    apptSpecialty,
    apptDoctor,
    specialties,
    doctorsBySpecialty,
    listDate,
    listSpecialty,
    availableAppointments,
    registerMsg,
    registerMsgTone,
    specialtyName,
    doctorName,
    onDocTypeChange,
    onDocNumberChange,
    onPatientNameChange,
    onApptDateChange,
    onApptTimeChange,
    onApptSpecialtyChange,
    onApptDoctorChange,
    onListDateChange,
    onListSpecialtyChange,
    onCreate,
    onToggleStatus,
  } = props;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Registro</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={onCreate} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-xl font-bold">Nueva Cita</h2>
          <p className="mt-3 text-xs font-semibold">Tipo de Documento</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onDocTypeChange("cedula")}
              className={
                docType === "cedula"
                  ? "h-9 rounded-md border border-teal-500 bg-teal-50 text-xs font-semibold text-teal-700"
                  : "h-9 rounded-md border border-slate-300 bg-slate-50 text-xs"
              }
            >
              <i className="fa fa-address-card-o"></i>  Cédula
            </button>
            <button
              type="button"
              onClick={() => onDocTypeChange("pasaporte")}
              className={
                docType === "pasaporte"
                  ? "h-9 rounded-md border border-teal-500 bg-teal-50 text-xs font-semibold text-teal-700"
                  : "h-9 rounded-md border border-slate-300 bg-slate-50 text-xs"
              }
            >
              <i className="fa fa-address-card"></i>  Pasaporte
            </button>
          </div>
          <label className="mt-2 grid gap-1 text-xs font-semibold text-slate-700">
            Numero de {docType === "cedula" ? "Cédula" : "Pasaporte"}
            <input value={docNumber} onChange={(e) => onDocNumberChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required />
          </label>
          <label className="mt-2 grid gap-1 text-xs font-semibold text-slate-700">
            Nombre del Paciente
            <input value={patientName} onChange={(e) => onPatientNameChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required />
          </label>
          <label className="mt-2 grid gap-1 text-xs font-semibold text-slate-700">
            Especialidad
            <select value={apptSpecialty} onChange={(e) => onApptSpecialtyChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required>
              <option value="">Seleccione una especialidad</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-700">
            Doctor
            <select value={apptDoctor} onChange={(e) => onApptDoctorChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required>
              <option value="">Seleccione un doctor</option>
              {doctorsBySpecialty.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fullName}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-700">
            Fecha de la Cita
            <input type="date" min={tomorrowISO()} value={apptDate} onChange={(e) => onApptDateChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required />
          </label>
          <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-700">
            Hora de Atencion
            <input type="time" value={apptTime} onChange={(e) => onApptTimeChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" required />
          </label>
          <button
            className="mt-3 h-10 w-full rounded-md bg-cyan-700 text-sm font-semibold text-white">
              <i className="fa fa-pencil-square-o"></i> Registrar Cita
          </button>
          <InlineMessage message={registerMsg} tone={registerMsgTone} className="mt-3" />
        </form>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-xl font-bold">Citas Agendadas</h3>
          <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-700">
            Filtrar por Fecha
            <input type="date" value={listDate} onChange={(e) => onListDateChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm" />
          </label>
          <label className="mt-3 grid gap-1 text-xs font-semibold text-slate-700">
            Filtrar por Especialidad
            <select value={listSpecialty} onChange={(e) => onListSpecialtyChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3 text-sm">
              <option value="all">Todas las especialidades</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-4 space-y-2">
            {availableAppointments.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No hay citas registradas</p>}
            {availableAppointments.map((a) => (
              <div key={a.id} className="rounded-lg border border-slate-200 p-2">
                <div className="flex items-start justify-between">
                  <p className="text-x font-bold">{a.patientName}</p>
                  <p className="text-xl font-bold text-cyan-700">{a.time}</p>
                  <button type="button" onClick={() => onToggleStatus(a.id)}
                    className={a.status === "atendida"? "inline-flex items-center gap-1 rounded-lg bg-teal-600 px-2 py-1 text-sm font-semibold text-white":
                    "inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1 text-sm font-semibold text-slate-900"}
                  >
                    <i className={a.status === "atendida" ? "fa fa-check-square" : "fa fa-square-o"}/> 
                    {a.status === "atendida" ? "Atendida" : "Pendiente"}
                  </button>
                </div>
                <div className="flex items-start justify-between">
                  <p className="text-sm mt-1">{a.documentType === "cedula" ? "Céd" : "Psprt"}: {a.documentNumber}</p>
                  <p className="text-sm mt-1">{specialtyName(a.specialtyId)}</p>
                  <p className="text-sm mt-1">{doctorName(a.doctorId)}</p>
                </div>
                <div className="text-sm mt-2 flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    {new Date(`${a.date}T12:00:00`).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}