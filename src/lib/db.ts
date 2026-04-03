import type { DB, MessageTone } from "../types";

// ─── Constantes ───────────────────────────────────────────────────────────────
export const STORAGE_KEY = "medical-appointments-db-v3";
export const API_URL = "http://localhost:4000/api/db";

export const defaultDB: DB = {
  users: [{ id: "admin", username: "admin", password: "admin", role: "admin" }],
  specialties: [],
  doctors: [],
  appointments: [],
  hasChangedAdminCredentials: false,
};

// ─── Normalización ────────────────────────────────────────────────────────────
const normalizeDB = (raw: Partial<DB> | null | undefined): DB => {
  if (!raw) return defaultDB;
  const users = Array.isArray(raw.users) ? raw.users : defaultDB.users;
  return {
    users: users.some((u) => u.role === "admin") ? users : defaultDB.users,
    specialties: Array.isArray(raw.specialties) ? raw.specialties : defaultDB.specialties,
    doctors: Array.isArray(raw.doctors) ? raw.doctors : defaultDB.doctors,
    appointments: Array.isArray(raw.appointments) ? raw.appointments : defaultDB.appointments,
    hasChangedAdminCredentials:
      typeof raw.hasChangedAdminCredentials === "boolean"
        ? raw.hasChangedAdminCredentials
        : defaultDB.hasChangedAdminCredentials,
  };
};

// ─── Fechas ───────────────────────────────────────────────────────────────────
const localISO = (offset = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export const todayISO = () => localISO(0);
export const tomorrowISO = () => localISO(1);

export const formatDate = (date: string) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

// ─── IDs ──────────────────────────────────────────────────────────────────────
export const makeId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ─── Persistencia ─────────────────────────────────────────────────────────────
export const loadDB = (): DB => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeDB(JSON.parse(raw) as Partial<DB>) : defaultDB;
  } catch {
    return defaultDB;
  }
};

export const loadDBFromApi = async (): Promise<DB> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error();
    const parsed = (await res.json()) as Partial<DB>;
    const safeDB = normalizeDB(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeDB));
    return safeDB;
  } catch {
    return loadDB();
  }
};

export const saveDBToApi = async (db: DB): Promise<void> => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db),
    });
  } catch {
    // Sin conexión: el respaldo local ya fue guardado.
  }
};

// ─── Estilos de mensajes ──────────────────────────────────────────────────────
export const messageToneStyles: Record<MessageTone, string> = {
  success: "border-emerald-400 bg-emerald-100 text-emerald-800",
  error: "border-rose-300 bg-rose-50 text-rose-700",
  info: "border-cyan-300 bg-cyan-50 text-cyan-800",
};
