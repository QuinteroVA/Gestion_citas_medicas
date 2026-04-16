import type { FormEvent } from "react";
import type { User } from "../../types";
import { PasswordInput } from "../shared/PasswordInput";

type UsersTabProps = {
  users: User[];
  newUser: string;
  newUserPass: string;
  onNewUserChange: (v: string) => void;
  onNewUserPassChange: (v: string) => void;
  onAddUser: (e: FormEvent) => void;
  onRemoveUser: (id: string) => void;
};

export function UsersTab({ users, newUser, newUserPass, onNewUserChange, onNewUserPassChange, onAddUser, onRemoveUser }: UsersTabProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">Gestión de Usuarios</h3>
      <form onSubmit={onAddUser} className="mt-4">
        <p className="font-semibold">Agregar Nuevo Usuario</p>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={newUser}
            onChange={(e) => onNewUserChange(e.target.value)}
            placeholder="Nombre de usuario"
            className="h-10 rounded-lg border border-slate-300 px-3"
            required
          />
          <PasswordInput
            value={newUserPass}
            onChange={onNewUserPassChange}
            placeholder="Contraseña"
            inputClassName="h-10"
            required
          />
          <button className="h-10 rounded-lg bg-teal-600 px-5 text-sm font-semibold text-white hover:bg-teal-700">
            <i className="fa fa-check-square-o mr-1" /> Agregar
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
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">
                  <span className={u.role === "admin"
                    ? "rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700"
                    : "rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700"}>
                    {u.role === "admin" ? "Administrador" : "Usuario"}
                  </span>
                </td>
                <td className="px-4 py-1 text-right">
                  {u.role === "user" && (
                    <button onClick={() => onRemoveUser(u.id)} className="rounded-lg bg-rose-500 px-4 py-1 text-sm font-semibold text-white hover:bg-rose-600">
                      <i className="fa fa-trash mr-1" /> Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
