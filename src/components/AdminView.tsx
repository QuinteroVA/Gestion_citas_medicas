import type { FormEvent } from "react";
import type { AdminTab, Doctor, MessageTone, Specialty, User } from "../types";
import { CredentialsTab } from "./admin/CredentialsTab";
import { DoctorsTab } from "./admin/DoctorsTab";
import { SpecialtiesTab } from "./admin/SpecialtiesTab";
import { UsersTab } from "./admin/UsersTab";
import { InlineMessage } from "./shared/InlineMessage";
import { TabButton } from "./shared/TabButton";

type AdminViewProps = {
  adminTab: AdminTab;
  adminMsg: string;
  adminMsgTone: MessageTone;
  users: User[];
  specialties: Specialty[];
  doctors: Doctor[];
  newUser: string;
  newUserPass: string;
  newAdminUser: string;
  newAdminPass: string;
  newSpecialty: string;
  newDoctor: string;
  newDoctorSpecialty: string;
  specialtyName: (id: string) => string;
  onAdminTabChange: (tab: AdminTab) => void;
  onNewUserChange: (value: string) => void;
  onNewUserPassChange: (value: string) => void;
  onNewAdminUserChange: (value: string) => void;
  onNewAdminPassChange: (value: string) => void;
  onNewSpecialtyChange: (value: string) => void;
  onNewDoctorChange: (value: string) => void;
  onNewDoctorSpecialtyChange: (value: string) => void;
  onAddUser: (e: FormEvent) => void;
  onRemoveUser: (id: string) => void;
  onUpdateAdminCreds: (e: FormEvent) => void;
  onAddSpecialty: (e: FormEvent) => void;
  onRemoveSpecialty: (id: string) => void;
  onAddDoctor: (e: FormEvent) => void;
  onRemoveDoctor: (id: string) => void;
};

const TABS: { label: string; value: AdminTab }[] = [
  { label: "Gestión de Usuarios", value: "usuarios" },
  { label: "Cambiar Credenciales", value: "credenciales" },
  { label: "Especialidades", value: "especialidades" },
  { label: "Médicos", value: "medicos" },
];

export function AdminView(props: AdminViewProps) {
  const { adminTab, adminMsg, adminMsgTone, onAdminTabChange, ...rest } = props;

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold">Panel de Administración</h1>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
        {/* Pestañas */}
        <div className="grid border-b border-slate-200 md:grid-cols-4">
          {TABS.map((tab) => (
            <TabButton key={tab.value} {...tab} active={adminTab} onChange={onAdminTabChange} />
          ))}
        </div>

        {/* Contenido */}
        <div className="p-6">
          <InlineMessage message={adminMsg} tone={adminMsgTone} className="mb-3" />

          {adminTab === "usuarios" && (
            <UsersTab
              users={rest.users}
              newUser={rest.newUser}
              newUserPass={rest.newUserPass}
              onNewUserChange={rest.onNewUserChange}
              onNewUserPassChange={rest.onNewUserPassChange}
              onAddUser={rest.onAddUser}
              onRemoveUser={rest.onRemoveUser}
            />
          )}

          {adminTab === "credenciales" && (
            <CredentialsTab
              newAdminUser={rest.newAdminUser}
              newAdminPass={rest.newAdminPass}
              onNewAdminUserChange={rest.onNewAdminUserChange}
              onNewAdminPassChange={rest.onNewAdminPassChange}
              onUpdateAdminCreds={rest.onUpdateAdminCreds}
            />
          )}

          {adminTab === "especialidades" && (
            <SpecialtiesTab
              specialties={rest.specialties}
              newSpecialty={rest.newSpecialty}
              onNewSpecialtyChange={rest.onNewSpecialtyChange}
              onAddSpecialty={rest.onAddSpecialty}
              onRemoveSpecialty={rest.onRemoveSpecialty}
            />
          )}

          {adminTab === "medicos" && (
            <DoctorsTab
              doctors={rest.doctors}
              specialties={rest.specialties}
              newDoctor={rest.newDoctor}
              newDoctorSpecialty={rest.newDoctorSpecialty}
              specialtyName={rest.specialtyName}
              onNewDoctorChange={rest.onNewDoctorChange}
              onNewDoctorSpecialtyChange={rest.onNewDoctorSpecialtyChange}
              onAddDoctor={rest.onAddDoctor}
              onRemoveDoctor={rest.onRemoveDoctor}
            />
          )}
        </div>
      </div>
    </section>
  );
}
