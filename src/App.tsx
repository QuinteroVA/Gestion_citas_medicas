import { type FormEvent, useEffect, useMemo, useState } from "react";
import { AdminView } from "./components/AdminView";
import { AppHeader } from "./components/AppHeader";
import { HomeView } from "./components/HomeView";
import { LoginView } from "./components/LoginView";
import { RegisterView } from "./components/RegisterView";
import { ReportsView } from "./components/ReportsView";
import { useDB } from "./hooks/useDB";
import { useMessage } from "./hooks/useMessage";
import { makeId, todayISO, tomorrowISO } from "./lib/db";
import type { AdminTab, DocType, ReportStatusFilter, User, View } from "./types";

export function App() {
  // ─ Base de datos ─
  const { db, setDb } = useDB();

  // ─ Sesión ─
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [view, setView] = useState<View>("inicio");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // ─ Formulario de nueva cita ─
  const [docType, setDocType] = useState<DocType>("cedula");
  const [docNumber, setDocNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [apptDate, setApptDate] = useState(tomorrowISO());
  const [apptTime, setApptTime] = useState("");
  const [apptSpecialty, setApptSpecialty] = useState("");
  const [apptDoctor, setApptDoctor] = useState("");
  const registerMessage = useMessage();

  // ─ Filtros de lista de citas ─
  const [listDate, setListDate] = useState(todayISO());
  const [listSpecialty, setListSpecialty] = useState("all");

  // ─ Filtros de reportes ─
  const [reportDate, setReportDate] = useState(todayISO());
  const [reportSpecialty, setReportSpecialty] = useState("all");
  const [reportStatus, setReportStatus] = useState<ReportStatusFilter>("all");

  // ─ Panel de administración ─
  const [adminTab, setAdminTab] = useState<AdminTab>("usuarios");
  const adminMessage = useMessage();
  const [newUser, setNewUser] = useState("");
  const [newUserPass, setNewUserPass] = useState("");
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newDoctor, setNewDoctor] = useState("");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("");

  // ─ Derivados ─
  const currentUser: User | null = db.users.find((u) => u.id === currentUserId) ?? null;
  const isAdmin = currentUser?.role === "admin";

  const specialtyName = (id: string) => db.specialties.find((s) => s.id === id)?.name ?? "Especialidad eliminada";
  const doctorName = (id: string) => db.doctors.find((d) => d.id === id)?.fullName ?? "Médico eliminado";

  const doctorsBySpecialty = useMemo(
    () => db.doctors.filter((d) => d.specialtyId === apptSpecialty),
    [db.doctors, apptSpecialty]
  );

  const availableAppointments = useMemo(
    () =>
      db.appointments
        .filter((a) => a.date === listDate)
        .filter((a) => listSpecialty === "all" || a.specialtyId === listSpecialty)
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [db.appointments, listDate, listSpecialty]
  );

  const reportAppointments = useMemo(
    () =>
      db.appointments
        .filter((a) => !reportDate || a.date === reportDate)
        .filter((a) => reportSpecialty === "all" || a.specialtyId === reportSpecialty)
        .filter((a) => reportStatus === "all" || a.status === reportStatus)
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [db.appointments, reportDate, reportSpecialty, reportStatus]
  );

  const reportStats = useMemo(() => {
    const atendidas = reportAppointments.filter((a) => a.status === "atendida").length;
    const pendientes = reportAppointments.length - atendidas;
    const porcentaje = reportAppointments.length === 0 ? 0 : Math.round((atendidas / reportAppointments.length) * 100);
    return { total: reportAppointments.length, atendidas, pendientes, porcentaje };
  }, [reportAppointments]);

  // ─ Efectos ─

  // Auto-completar nombre del paciente por número de documento
  useEffect(() => {
    if (!docNumber.trim()) return;
    const found = [...db.appointments]
      .reverse()
      .find((a) => a.documentType === docType && a.documentNumber.trim().toLowerCase() === docNumber.trim().toLowerCase());
    if (found) setPatientName(found.patientName);
  }, [docNumber, docType, db.appointments]);

  // Resetear doctor si cambia la especialidad
  useEffect(() => {
    if (!apptSpecialty) { setApptDoctor(""); return; }
    const valid = db.doctors.some((d) => d.id === apptDoctor && d.specialtyId === apptSpecialty);
    if (!valid) setApptDoctor("");
  }, [apptSpecialty, apptDoctor, db.doctors]);

  // ─ Handlers: sesión ─
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = db.users.find((u) => u.username === loginUser.trim() && u.password === loginPass);
    if (!user) { setLoginError("Usuario o contraseña incorrectos"); return; }
    setCurrentUserId(user.id);
    setView("inicio");
    setLoginError("");
    setLoginUser("");
    setLoginPass("");
  };

  const doLogout = () => { setCurrentUserId(null); setView("inicio"); };

  // ─ Handlers: citas ─
  const createAppointment = (e: FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !docNumber.trim() || !apptSpecialty || !apptDoctor || !apptTime) {
      registerMessage.showMsg("Completa todos los campos", "error");
      return;
    }
    if (db.appointments.some((a) => a.date === apptDate && a.time === apptTime && a.doctorId === apptDoctor)) {
      registerMessage.showMsg("El doctor ya tiene una cita en esa fecha y hora", "error");
      return;
    }
    setDb((prev) => ({
      ...prev,
      appointments: [
        ...prev.appointments,
        {
          id: makeId("appt"),
          date: apptDate,
          time: apptTime,
          specialtyId: apptSpecialty,
          doctorId: apptDoctor,
          patientName: patientName.trim(),
          documentType: docType,
          documentNumber: docNumber.trim(),
          status: "pendiente",
        },
      ],
    }));
    setDocType("cedula");
    setDocNumber("");
    setPatientName("");
    setApptDate(tomorrowISO());
    setApptSpecialty("");
    setApptDoctor("");
    setApptTime("");
    registerMessage.showMsg("Cita registrada exitosamente", "success");
  };

  const toggleStatus = (id: string) => {
    const appt = db.appointments.find((a) => a.id === id);
    if (!appt) return;
    const nextStatus = appt.status === "atendida" ? "pendiente" : "atendida";
    setDb((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === id ? { ...a, status: nextStatus } : a)),
    }));
    registerMessage.showMsg(`Cita marcada como ${nextStatus}`, "success");
  };

  // ─ Handlers: administración ─
  const addUser = (e: FormEvent) => {
    e.preventDefault();
    const username = newUser.trim();
    const password = newUserPass.trim();
    if (!username || !password) { adminMessage.showMsg("Completa usuario y contraseña", "error"); return; }
    if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      adminMessage.showMsg("Usuario ya existe", "error"); return;
    }
    setDb((prev) => ({ ...prev, users: [...prev.users, { id: makeId("usr"), username, password, role: "user" }] }));
    setNewUser("");
    setNewUserPass("");
    adminMessage.showMsg("Usuario agregado", "success");
  };

  const removeUser = (id: string) => {
    const user = db.users.find((u) => u.id === id);
    if (!user || user.role === "admin") return;
    setDb((prev) => ({ ...prev, users: prev.users.filter((u) => u.id !== id) }));
    adminMessage.showMsg(`Usuario ${user.username} eliminado`, "success");
  };

  const updateAdminCreds = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== "admin") return;
    const username = newAdminUser.trim();
    const password = newAdminPass.trim();
    if (!username || !password) { adminMessage.showMsg("Completa usuario y contraseña", "error"); return; }
    if (db.users.some((u) => u.id !== currentUser.id && u.username.toLowerCase() === username.toLowerCase())) {
      adminMessage.showMsg("Usuario ya existe", "error"); return;
    }
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === currentUser.id ? { ...u, username, password } : u)),
      hasChangedAdminCredentials: true,
    }));
    setNewAdminUser("");
    setNewAdminPass("");
    adminMessage.showMsg("Credenciales actualizadas", "success");
  };

  const addSpecialty = (e: FormEvent) => {
    e.preventDefault();
    const name = newSpecialty.trim();
    if (!name) return;
    if (db.specialties.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      adminMessage.showMsg("Especialidad ya existe", "error"); return;
    }
    setDb((prev) => ({ ...prev, specialties: [...prev.specialties, { id: makeId("sp"), name }] }));
    setNewSpecialty("");
    adminMessage.showMsg("Especialidad agregada", "success");
  };

  const removeSpecialty = (id: string) => {
    if (db.doctors.some((d) => d.specialtyId === id)) {
      adminMessage.showMsg("No se puede eliminar, hay médicos vinculados", "error"); return;
    }
    const specialty = db.specialties.find((s) => s.id === id);
    if (!specialty) return;
    setDb((prev) => ({ ...prev, specialties: prev.specialties.filter((s) => s.id !== id) }));
    adminMessage.showMsg(`Especialidad ${specialty.name} eliminada`, "success");
  };

  const addDoctor = (e: FormEvent) => {
    e.preventDefault();
    if (!newDoctor.trim() || !newDoctorSpecialty) return;
    setDb((prev) => ({
      ...prev,
      doctors: [...prev.doctors, { id: makeId("dr"), fullName: newDoctor.trim(), specialtyId: newDoctorSpecialty }],
    }));
    setNewDoctor("");
    setNewDoctorSpecialty("");
    adminMessage.showMsg("Médico agregado", "success");
  };

  const removeDoctor = (id: string) => {
    const doctor = db.doctors.find((d) => d.id === id);
    if (!doctor) return;
    setDb((prev) => ({
      ...prev,
      doctors: prev.doctors.filter((d) => d.id !== id),
      appointments: prev.appointments.filter((a) => a.doctorId !== id),
    }));
    adminMessage.showMsg(`Médico ${doctor.fullName} eliminado`, "success");
  };

  // ─ Render ─
  if (!currentUser) {
    return (
      <LoginView
        loginUser={loginUser}
        loginPass={loginPass}
        loginError={loginError}
        showInitialAccess={!db.hasChangedAdminCredentials}
        onUserChange={setLoginUser}
        onPassChange={setLoginPass}
        onSubmit={doLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 text-slate-900">
      <style>{`@media print { .no-print { display: none !important; } body { background: white; } }`}</style>

      <AppHeader
        currentUser={currentUser}
        isAdmin={isAdmin}
        view={view}
        onViewChange={setView}
        onLogout={doLogout}
      />

      <main className="mx-auto w-full max-w-5xl px-5 py-6">
        {view === "inicio" && (
          <HomeView onGoRegistro={() => setView("registro")} onGoReportes={() => setView("reportes")} />
        )}

        {view === "registro" && (
          <RegisterView
            docType={docType}
            docNumber={docNumber}
            patientName={patientName}
            apptDate={apptDate}
            apptTime={apptTime}
            apptSpecialty={apptSpecialty}
            apptDoctor={apptDoctor}
            specialties={db.specialties}
            doctorsBySpecialty={doctorsBySpecialty}
            listDate={listDate}
            listSpecialty={listSpecialty}
            availableAppointments={availableAppointments}
            registerMsg={registerMessage.msg.text}
            registerMsgTone={registerMessage.msg.tone}
            specialtyName={specialtyName}
            doctorName={doctorName}
            onDocTypeChange={setDocType}
            onDocNumberChange={setDocNumber}
            onPatientNameChange={setPatientName}
            onApptDateChange={setApptDate}
            onApptTimeChange={setApptTime}
            onApptSpecialtyChange={setApptSpecialty}
            onApptDoctorChange={setApptDoctor}
            onListDateChange={setListDate}
            onListSpecialtyChange={setListSpecialty}
            onCreate={createAppointment}
            onToggleStatus={toggleStatus}
          />
        )}

        {view === "reportes" && (
          <ReportsView
            reportDate={reportDate}
            reportSpecialty={reportSpecialty}
            reportStatus={reportStatus}
            reportAppointments={reportAppointments}
            reportStats={reportStats}
            specialties={db.specialties}
            specialtyName={specialtyName}
            doctorName={doctorName}
            onReportDateChange={setReportDate}
            onReportSpecialtyChange={setReportSpecialty}
            onReportStatusChange={setReportStatus}
          />
        )}

        {view === "administracion" && isAdmin && (
          <AdminView
            adminTab={adminTab}
            adminMsg={adminMessage.msg.text}
            adminMsgTone={adminMessage.msg.tone}
            users={db.users}
            specialties={db.specialties}
            doctors={db.doctors}
            newUser={newUser}
            newUserPass={newUserPass}
            newAdminUser={newAdminUser}
            newAdminPass={newAdminPass}
            newSpecialty={newSpecialty}
            newDoctor={newDoctor}
            newDoctorSpecialty={newDoctorSpecialty}
            specialtyName={specialtyName}
            onAdminTabChange={setAdminTab}
            onNewUserChange={setNewUser}
            onNewUserPassChange={setNewUserPass}
            onNewAdminUserChange={setNewAdminUser}
            onNewAdminPassChange={setNewAdminPass}
            onNewSpecialtyChange={setNewSpecialty}
            onNewDoctorChange={setNewDoctor}
            onNewDoctorSpecialtyChange={setNewDoctorSpecialty}
            onAddUser={addUser}
            onRemoveUser={removeUser}
            onUpdateAdminCreds={updateAdminCreds}
            onAddSpecialty={addSpecialty}
            onRemoveSpecialty={removeSpecialty}
            onAddDoctor={addDoctor}
            onRemoveDoctor={removeDoctor}
          />
        )}
      </main>

      <footer className="no-print mt-8 bg-cyan-700 py-4 text-center text-sm text-white">
        © 2026 Administración de Citas Médicas. Todos los derechos reservados.
      </footer>
    </div>
  );
}
