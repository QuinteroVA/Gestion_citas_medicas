import type { FormEvent } from 'react';
import { InlineMessage } from './InlineMessage';
import type { AdminTab, Doctor, MessageTone, Specialty, User } from '../types';

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

export function AdminView(props: AdminViewProps) {
  const {
    adminTab,
    adminMsg,
    adminMsgTone,
    users,
    specialties,
    doctors,
    newUser,
    newUserPass,
    newAdminUser,
    newAdminPass,
    newSpecialty,
    newDoctor,
    newDoctorSpecialty,
    specialtyName,
    onAdminTabChange,
    onNewUserChange,
    onNewUserPassChange,
    onNewAdminUserChange,
    onNewAdminPassChange,
    onNewSpecialtyChange,
    onNewDoctorChange,
    onNewDoctorSpecialtyChange,
    onAddUser,
    onRemoveUser,
    onUpdateAdminCreds,
    onAddSpecialty,
    onRemoveSpecialty,
    onAddDoctor,
    onRemoveDoctor,
  } = props;

  return (
    <section>
      <h1 className="mb-5 text-2xl font-bold">Panel de Administración</h1>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid border-b border-slate-200 md:grid-cols-4">
          <button
            onClick={() => onAdminTabChange('usuarios')}
            className={
              adminTab === 'usuarios'
                ? 'h-12 bg-teal-600 text-sm font-semibold text-white'
                : 'h-12 bg-slate-50 text-sm'
            }
          >
            Gestión de Usuarios
          </button>
          <button
            onClick={() => onAdminTabChange('credenciales')}
            className={
              adminTab === 'credenciales'
                ? 'h-12 bg-teal-600 text-sm font-semibold text-white'
                : 'h-12 bg-slate-50 text-sm'
            }
          >
            Cambiar Credenciales
          </button>
          <button
            onClick={() => onAdminTabChange('especialidades')}
            className={
              adminTab === 'especialidades'
                ? 'h-12 bg-teal-600 text-sm font-semibold text-white'
                : 'h-12 bg-slate-50 text-sm'
            }
          >
            Especialidades
          </button>
          <button
            onClick={() => onAdminTabChange('medicos')}
            className={
              adminTab === 'medicos'
                ? 'h-12 bg-teal-600 text-sm font-semibold text-white'
                : 'h-12 bg-slate-50 text-sm'
            }
          >
            Médicos
          </button>
        </div>
        <div className="p-6">
          <InlineMessage message={adminMsg} tone={adminMsgTone} className="mb-3" />
          {adminTab === 'usuarios' && (
            <div>
              <h3 className="text-2xl font-bold">Gestión de Usuarios</h3>
              <form onSubmit={onAddUser} className="mt-4 rounded-xl">
                <p className="font-semibold">Agregar Nuevo Usuario</p>
                <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    value={newUser}
                    onChange={(e) => onNewUserChange(e.target.value)}
                    placeholder="Nombre de usuario"
                    className="h-10 rounded-lg border border-slate-300 px-3"
                    required
                  />
                  <input
                    type="password"
                    value={newUserPass}
                    onChange={(e) => onNewUserPassChange(e.target.value)}
                    placeholder="Contraseña"
                    className="h-10 rounded-lg border border-slate-300 px-3"
                    required
                  />
                  <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white">
                    <i className="fa fa-check-square-o"></i> Agregar Usuario
                  </button>
                </div>
              </form>
              <div className="mt-5 overflow-auto">
                <table className="min-w-full text-left">
                  <thead className="border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-lg">Usuario</th>
                      <th className="px-4 py-3 text-lg">Rol</th>
                      <th className="px-4 py-3 text-right text-lg">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-slate-100">
                        <td className="px-4 py-2 text-base">{u.username}</td>
                        <td className="px-4 py-2">
                          <span
                            className={
                              u.role === 'admin'
                                ? 'rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700'
                                : 'rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700'
                            }
                          >
                            {u.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </span>
                        </td>
                        <td className="px-4 py-1 text-right">
                          {u.role === 'user' && (
                            <button onClick={() => onRemoveUser(u.id)}
                              className="rounded-lg bg-rose-500 px-4 py-1 text-sm font-semibold text-white">
                              <i className="fa fa-trash"></i> Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {adminTab === 'credenciales' && (
            <form onSubmit={onUpdateAdminCreds} className="space-y-3">
              <h3 className="text-2xl font-bold">Cambiar Credenciales</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={newAdminUser}
                  onChange={(e) => onNewAdminUserChange(e.target.value)}
                  placeholder="Nuevo usuario admin"
                  className="h-11 rounded-lg border border-slate-300 px-3"
                  required
                />
                <input
                  type="password"
                  value={newAdminPass}
                  onChange={(e) => onNewAdminPassChange(e.target.value)}
                  placeholder="Nueva contraseña admin"
                  className="h-11 rounded-lg border border-slate-300 px-3"
                  required
                />
              </div>
              <button className="h-10 rounded-lg bg-teal-600 px-5 text-white">
                <i className="fa fa-save"></i>  Guardar
              </button>
            </form>
          )}
          {adminTab === 'especialidades' && (
            <div className="space-y-4">
              <form onSubmit={onAddSpecialty} className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  value={newSpecialty}
                  onChange={(e) => onNewSpecialtyChange(e.target.value)}
                  placeholder="Nombre de especialidad"
                  className="h-10 rounded-lg border border-slate-300 px-3"
                  required
                />
                <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm text-white">
                  <i className="fa fa-check-square-o"></i> Agregar
                </button>
              </form>
              <ul className="space-y-2">
                {specialties.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-1"
                  >
                    <span>{s.name}</span>
                    <button onClick={() => onRemoveSpecialty(s.id)}
                      className="rounded-lg border bg-rose-500 px-3 py-1 text-sm font-semibold text-white">
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {adminTab === 'medicos' && (
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
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm text-white">
                  <i className="fa fa-check-square-o"></i> Agregar médico
                </button>
              </form>
              <ul className="space-y-2">
                {doctors.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2"
                  >
                    <span>
                      {d.fullName} - {specialtyName(d.specialtyId)}
                    </span>
                    <button onClick={() => onRemoveDoctor(d.id)}
                      className="rounded-lg border bg-rose-500 px-3 py-1 text-sm font-semibold text-white">
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}