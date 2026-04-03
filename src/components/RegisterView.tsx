import type { FormEvent } from "react";
import type { Appointment, DocType, Doctor, MessageTone, Specialty } from "../types";
import { AppointmentForm } from "./register/AppointmentForm";
import { AppointmentList } from "./register/AppointmentList";

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
    specialties, doctorsBySpecialty, availableAppointments,
    specialtyName, doctorName,
    listDate, listSpecialty, onListDateChange, onListSpecialtyChange, onToggleStatus,
    ...formProps
  } = props;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Registro</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <AppointmentForm
          {...formProps}
          specialties={specialties}
          doctorsBySpecialty={doctorsBySpecialty}
        />
        <AppointmentList
          listDate={listDate}
          listSpecialty={listSpecialty}
          specialties={specialties}
          availableAppointments={availableAppointments}
          specialtyName={specialtyName}
          doctorName={doctorName}
          onListDateChange={onListDateChange}
          onListSpecialtyChange={onListSpecialtyChange}
          onToggleStatus={onToggleStatus}
        />
      </div>
    </section>
  );
}
