import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminView } from "./components/AdminView";
import { AppHeader } from "./components/AppHeader";
import { HomeView } from "./components/HomeView";
import { LoginView } from "./components/LoginView";
import { RegisterView } from "./components/RegisterView";
import { ReportsView } from "./components/ReportsView";
import { loadDB, loadDBFromApi, makeId, saveDBToApi, todayISO, tomorrowISO } from "./lib/data";
import type { AdminTab, DB, DocType, MessageTone, ReportStatusFilter, User, View } from "./types";

export function App() {
  const [db, setDb] = useState<DB>(loadDB);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [view, setView] = useState<View>("inicio");

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const [docType, setDocType] = useState<DocType>("cedula");
  const [docNumber, setDocNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [apptDate, setApptDate] = useState(tomorrowISO());
  const [apptTime, setApptTime] = useState("");
  const [apptSpecialty, setApptSpecialty] = useState("");
  const [apptDoctor, setApptDoctor] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");
  const [registerMsgTone, setRegisterMsgTone] = useState<MessageTone>("info");

  const [listDate, setListDate] = useState(todayISO());
  const [listSpecialty, setListSpecialty] = useState("all");

  const [reportDate, setReportDate] = useState(todayISO());
  const [reportSpecialty, setReportSpecialty] = useState("all");
  const [reportStatus, setReportStatus] = useState<ReportStatusFilter>("all");

  const [adminTab, setAdminTab] = useState<AdminTab>("usuarios");
  const [adminMsg, setAdminMsg] = useState("");
  const [adminMsgTone, setAdminMsgTone] = useState<MessageTone>("info");
  const [newUser, setNewUser] = useState("");
  const [newUserPass, setNewUserPass] = useState("");
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newDoctor, setNewDoctor] = useState("");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("");

  const currentUser: User | null = db.users.find((u) => u.id === currentUserId) ?? null;
  const isAdmin = currentUser?.role === "admin";

  const doctorsBySpecialty = useMemo(() => db.doctors.filter((d) => d.specialtyId === apptSpecialty), [db.doctors, apptSpecialty]);

  const specialtyName = (id: string) => db.specialties.find((s) => s.id === id)?.name ?? "Especialidad eliminada";
  const doctorName = (id: string) => db.doctors.find((d) => d.id === id)?.fullName ?? "Médico eliminado";

  const availableAppointments = useMemo(() => {
    return db.appointments
      .filter((a) => a.date === listDate)
      .filter((a) => listSpecialty === "all" || a.specialtyId === listSpecialty)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  }, [db.appointments, listDate, listSpecialty]);

  const reportAppointments = useMemo(() => {
    return db.appointments
      .filter((a) => !reportDate || a.date === reportDate)
      .filter((a) => reportSpecialty === "all" || a.specialtyId === reportSpecialty)
      .filter((a) => reportStatus === "all" || a.status === reportStatus)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  }, [db.appointments, reportDate, reportSpecialty, reportStatus]);

  const reportStats = useMemo(() => {
    const atendidas = reportAppointments.filter((a) => a.status === "atendida").length;
    const pendientes = reportAppointments.length - atendidas;
    const porcentaje = reportAppointments.length === 0 ? 0 : Math.round((atendidas / reportAppointments.length) * 100);
    const doctores = new Set(reportAppointments.map((a) => a.doctorId)).size;
    return { total: reportAppointments.length, atendidas, pendientes, porcentaje, doctores };
  }, [reportAppointments]);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const initialDB = await loadDBFromApi();
      if (!isMounted) return;
      setDb(initialDB);
      setIsHydrated(true);
    };

    void init();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    void saveDBToApi(db);
  }, [db, isHydrated]);

  useEffect(() => {
    if (!docNumber.trim()) return;
    const found = [...db.appointments]
      .reverse()
      .find((a) => a.documentType === docType && a.documentNumber.trim().toLowerCase() === docNumber.trim().toLowerCase());
    if (found) setPatientName(found.patientName);
  }, [docNumber, docType, db.appointments]);

  useEffect(() => {
    if (!apptSpecialty) {
      setApptDoctor("");
      return;
    }
    const valid = db.doctors.some((d) => d.id === apptDoctor && d.specialtyId === apptSpecialty);
    if (!valid) setApptDoctor("");
  }, [apptSpecialty, apptDoctor, db.doctors]);

  useEffect(() => {
    if (!registerMsg) return;
    const timer = window.setTimeout(() => setRegisterMsg(""), 5000);
    return () => window.clearTimeout(timer);
  }, [registerMsg]);

  useEffect(() => {
    if (!adminMsg) return;
    const timer = window.setTimeout(() => setAdminMsg(""), 5000);
    return () => window.clearTimeout(timer);
  }, [adminMsg]);

  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    const user = db.users.find((u) => u.username === loginUser.trim() && u.password === loginPass);
    if (!user) {
      setLoginError("Usuario o contraseña incorrectos");
      return;
    }
    setCurrentUserId(user.id);
    setView("inicio");
    setLoginError("");
    setLoginUser("");
    setLoginPass("");
  };

  const createAppointment = (e: FormEvent) => {
    e.preventDefault();
    setRegisterMsg("");

    //if (apptDate <= todayISO()) {
      //setRegisterMsgTone("error");
      //setRegisterMsg("Solo se permite registrar citas para dias posteriores al actual");
      //return;
    //}
    if (!patientName.trim() || !docNumber.trim() || !apptSpecialty || !apptDoctor || !apptTime) {
      setRegisterMsgTone("error");
      setRegisterMsg("Completa todos los campos");
      return;
    }

    const occupied = db.appointments.some((a) => a.date === apptDate && a.time === apptTime && a.doctorId === apptDoctor);
    if (occupied) {
      setRegisterMsgTone("error");
      setRegisterMsg("El doctor ya tiene una cita en esa fecha y hora");
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
    setRegisterMsgTone("success");
    setRegisterMsg("Cita registrada exitosamente");
  };

  const toggleStatus = (id: string) => {
    const appointment = db.appointments.find((a) => a.id === id);
    if (!appointment) return;
    const nextStatus = appointment.status === "atendida" ? "pendiente" : "atendida";

    setDb((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === id ? { ...a, status: nextStatus } : a)),
    }));
    setRegisterMsgTone("success");
    setRegisterMsg(`Cita marcada como ${nextStatus}`);
  };

  const addUser = (e: FormEvent) => {
    e.preventDefault();
    setAdminMsg("");
    const username = newUser.trim();
    const password = newUserPass.trim();
    if (!username || !password) {
      setAdminMsgTone("error");
      setAdminMsg("Completa usuario y contraseña");
      return;
    }
    if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      setAdminMsgTone("error");
      setAdminMsg("Usuario ya existe");
      return;
    }

    setDb((prev) => ({ ...prev, users: [...prev.users, { id: makeId("usr"), username, password, role: "user" }] }));
    setNewUser("");
    setNewUserPass("");
    setAdminMsgTone("success");
    setAdminMsg("Usuario agregado");
  };

  const removeUser = (id: string) => {
    const user = db.users.find((u) => u.id === id);
    if (!user || user.role === "admin") return;
    setDb((prev) => ({ ...prev, users: prev.users.filter((u) => u.id !== id) }));
    setAdminMsgTone("success");
    setAdminMsg(`Usuario ${user.username} eliminado`);
  };

  const updateAdminCreds = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== "admin") return;
    const username = newAdminUser.trim();
    const password = newAdminPass.trim();
    if (!username || !password) {
      setAdminMsgTone("error");
      setAdminMsg("Completa usuario y contraseña");
      return;
    }
    if (db.users.some((u) => u.id !== currentUser.id && u.username.toLowerCase() === username.toLowerCase())) {
      setAdminMsgTone("error");
      setAdminMsg("Usuario ya existe");
      return;
    }
    setNewAdminUser("");
    setNewAdminPass("");
    setDb((prev) => ({ ...prev,
      users: prev.users.map((u) => (u.id === currentUser.id ? { ...u, username, password } : u)),
      hasChangedAdminCredentials: true,
    }));
    setAdminMsgTone("success");
    setAdminMsg("Credenciales actualizadas");
  };

  const addSpecialty = (e: FormEvent) => {
    e.preventDefault();
    const name = newSpecialty.trim();
    if (!name) return;
    if (db.specialties.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setAdminMsgTone("error");
      setAdminMsg("Especialidad ya existe");
      return;
    }
    setDb((prev) => ({ ...prev, specialties: [...prev.specialties, { id: makeId("sp"), name }] }));
    setNewSpecialty("");
    setAdminMsgTone("success");
    setAdminMsg("Especialidad agregada");
  };

  const removeSpecialty = (id: string) => {
    if (db.doctors.some((d) => d.specialtyId === id)) {
      setAdminMsgTone("error");
      setAdminMsg("No se puede eliminar, hay médicos vinculados");
      return;
    }
    const specialty = db.specialties.find((s) => s.id === id);
    if (!specialty) return;
    setDb((prev) => ({ ...prev, specialties: prev.specialties.filter((s) => s.id !== id) }));
    setAdminMsgTone("success");
    setAdminMsg(`Especialidad ${specialty.name} eliminada`);
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
    setAdminMsgTone("success");
    setAdminMsg("Médico agregado");
  };

  const removeDoctor = (id: string) => {
    const doctor = db.doctors.find((d) => d.id === id);
    if (!doctor) return;
    setDb((prev) => ({
      ...prev,
      doctors: prev.doctors.filter((d) => d.id !== id),
      appointments: prev.appointments.filter((a) => a.doctorId !== id),
    }));
    setAdminMsgTone("success");
    setAdminMsg(`Médico ${doctor.fullName} eliminado`);
  };

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
        onLogout={() => {
          setCurrentUserId(null);
          setView("inicio");
        }}
      />

      <main className="mx-auto w-full max-w-5xl px-5 py-6">
        {view === "inicio" && <HomeView onGoRegistro={() => setView("registro")} onGoReportes={() => setView("reportes")} />}

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
            registerMsg={registerMsg}
            registerMsgTone={registerMsgTone}
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
            adminMsg={adminMsg}
            adminMsgTone={adminMsgTone}
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