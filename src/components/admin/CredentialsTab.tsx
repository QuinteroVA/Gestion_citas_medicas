import type { FormEvent } from "react";
import { PasswordInput } from "../shared/PasswordInput";

type CredentialsTabProps = {
  newAdminUser: string;
  newAdminPass: string;
  onNewAdminUserChange: (v: string) => void;
  onNewAdminPassChange: (v: string) => void;
  onUpdateAdminCreds: (e: FormEvent) => void;
};

export function CredentialsTab({ newAdminUser, newAdminPass, onNewAdminUserChange, onNewAdminPassChange, onUpdateAdminCreds }: CredentialsTabProps) {
  return (
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
        <PasswordInput
          value={newAdminPass}
          onChange={onNewAdminPassChange}
          placeholder="Nueva contraseña admin"
          inputClassName="h-11"
          required
        />
      </div>
      <button className="h-10 rounded-lg bg-teal-600 px-5 text-white hover:bg-teal-700">
        <i className="fa fa-save mr-1" /> Guardar
      </button>
    </form>
  );
}
