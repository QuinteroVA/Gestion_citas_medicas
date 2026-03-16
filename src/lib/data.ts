import type { DB, MessageTone } from "../types";

export const STORAGE_KEY = "medical-appointments-db-v3";
export const API_URL = "http://localhost:4000/api/db";

export const defaultDB: DB = {
  users: [{ id: "admin", username: "admin", password: "admin", role: "admin" }],
  specialties: [],
  doctors: [],
  appointments: [],
  hasChangedAdminCredentials: false,
};

const normalizeDB = (raw: Partial<DB> | null | undefined): DB => {
  if (!raw) return defaultDB;

  const users = Array.isArray(raw.users) ? raw.users : defaultDB.users;
  const hasAdmin = users.some((u) => u.role === "admin");

  return {
    users: hasAdmin ? users : defaultDB.users,
    specialties: Array.isArray(raw.specialties) ? raw.specialties : defaultDB.specialties,
    doctors: Array.isArray(raw.doctors) ? raw.doctors : defaultDB.doctors,
    appointments: Array.isArray(raw.appointments) ? raw.appointments : defaultDB.appointments,
    hasChangedAdminCredentials:
      typeof raw.hasChangedAdminCredentials === "boolean" ? raw.hasChangedAdminCredentials : defaultDB.hasChangedAdminCredentials,
  };
};

export const todayISO = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
};

export const tomorrowISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
};

export const formatDate = (date: string) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

export const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const loadDB = (): DB => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDB;
    return normalizeDB(JSON.parse(raw) as Partial<DB>);
  } catch {
    return defaultDB;
  }
};

export const loadDBFromApi = async (): Promise<DB> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("No se pudo leer la base de datos");
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
    // Si la API no esta disponible, se conserva el respaldo local.
  }
};

export const messageToneStyles: Record<MessageTone, string> = {
  success: "border-emerald-400 bg-emerald-100 text-emerald-800",
  error: "border-rose-300 bg-rose-50 text-rose-700",
  info: "border-cyan-300 bg-cyan-50 text-cyan-800",
};