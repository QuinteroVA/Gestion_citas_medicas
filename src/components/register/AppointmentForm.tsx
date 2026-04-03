import type { FormEvent } from "react";
import { tomorrowISO } from "../../lib/db";
import { InlineMessage } from "../shared/InlineMessage";
import type { DocType, Doctor, MessageTone, Specialty } from "../../types";

type AppointmentFormProps = {
  docType: DocType;
  docNumber: string;
  patientName: string;
  apptDate: string;
  apptTime: string;
  apptSpecialty: string;
  apptDoctor: string;
  specialties: Specialty[];
  doctorsBySpecialty: Doctor[];
  registerMsg: string;
  registerMsgTone: MessageTone;
  onDocTypeChange: (value: DocType) => void;
  onDocNumberChange: (value: string) => void;
  onPatientNameChange: (value: string) => void;
  onApptDateChange: (value: string) => void;
  onApptTimeChange: (value: string) => void;
  onApptSpecialtyChange: (value: string) => void;
  onApptDoctorChange: (value: string) => void;
  onCreate: (e: FormEvent) => void;
};

const inputClass = "h-10 rounded-md border border-slate-300 px-3 text-sm";
const labelClass = "mt-2 grid gap-1 text-xs font-semibold text-slate-700";

export function AppointmentForm({
  docType, docNumber, patientName, apptDate, apptTime,
  apptSpecialty, apptDoctor, specialties, doctorsBySpecialty,
  registerMsg, registerMsgTone,
  onDocTypeChange, onDocNumberChange, onPatientNameChange,
  onApptDateChange, onApptTimeChange, onApptSpecialtyChange,
  onApptDoctorChange, onCreate,
}: AppointmentFormProps) {
  return (
    <form
      onSubmit={onCreate}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_10px_22px_rgba(15,23,42,0.12)]"
    >
      <h2 className="text-xl font-bold">Nueva Cita</h2>

      {/* Tipo de documento */}
      <p className="mt-3 text-xs font-semibold">Tipo de Documento</p>
      <div className="mt-1 grid grid-cols-2 gap-2">
        {(["cedula", "pasaporte"] as DocType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onDocTypeChange(type)}
            className={
              docType === type
                ? "h-9 rounded-md border border-teal-500 bg-teal-50 text-xs font-semibold text-teal-700"
                : "h-9 rounded-md border border-slate-300 bg-slate-50 text-xs"
            }
          >
            <i className={`fa ${type === "cedula" ? "fa-address-card-o" : "fa-address-card"} mr-1`} />
            {type === "cedula" ? "Cédula" : "Pasaporte"}
          </button>
        ))}
      </div>

      <label className={labelClass}>
        Número de {docType === "cedula" ? "Cédula" : "Pasaporte"}
        <input value={docNumber} onChange={(e) => onDocNumberChange(e.target.value)} className={inputClass} required />
      </label>

      <label className={labelClass}>
        Nombre del Paciente
        <input value={patientName} onChange={(e) => onPatientNameChange(e.target.value)} className={inputClass} required />
      </label>

      <label className={labelClass}>
        Especialidad
        <select value={apptSpecialty} onChange={(e) => onApptSpecialtyChange(e.target.value)} className={inputClass} required>
          <option value="">Seleccione una especialidad</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Doctor
        <select value={apptDoctor} onChange={(e) => onApptDoctorChange(e.target.value)} className={inputClass} required>
          <option value="">Seleccione un doctor</option>
          {doctorsBySpecialty.map((d) => (
            <option key={d.id} value={d.id}>{d.fullName}</option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Fecha de la Cita
        <input type="date" min={tomorrowISO()} value={apptDate} onChange={(e) => onApptDateChange(e.target.value)} className={inputClass} required />
      </label>

      <label className={labelClass}>
        Hora de Atención
        <input type="time" value={apptTime} onChange={(e) => onApptTimeChange(e.target.value)} className={inputClass} required />
      </label>

      <button className="mt-3 h-10 w-full rounded-md bg-cyan-700 text-sm font-semibold text-white hover:bg-cyan-800">
        <i className="fa fa-pencil-square-o mr-1" /> Registrar Cita
      </button>

      <InlineMessage message={registerMsg} tone={registerMsgTone} className="mt-3" />
    </form>
  );
}
