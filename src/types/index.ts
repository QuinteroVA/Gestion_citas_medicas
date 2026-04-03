// ─── Roles y vistas ───────────────────────────────────────────────────────────
export type Role = "admin" | "user";
export type View = "inicio" | "registro" | "reportes" | "administracion";

// ─── Entidades del dominio ────────────────────────────────────────────────────
export type DocType = "cedula" | "pasaporte";
export type AppointmentStatus = "pendiente" | "atendida";
export type AdminTab = "usuarios" | "credenciales" | "especialidades" | "medicos";
export type ReportStatusFilter = "all" | AppointmentStatus;
export type MessageTone = "success" | "error" | "info";

export type User = {
  id: string;
  username: string;
  password: string;
  role: Role;
};

export type Specialty = {
  id: string;
  name: string;
};

export type Doctor = {
  id: string;
  fullName: string;
  specialtyId: string;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  specialtyId: string;
  doctorId: string;
  patientName: string;
  documentType: DocType;
  documentNumber: string;
  status: AppointmentStatus;
};

export type DB = {
  users: User[];
  specialties: Specialty[];
  doctors: Doctor[];
  appointments: Appointment[];
  hasChangedAdminCredentials: boolean;
};
