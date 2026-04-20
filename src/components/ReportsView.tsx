import { formatDate } from "../lib/db";
import type { Appointment, ReportStatusFilter, Specialty } from "../types";

type ReportStats = {
  total: number;
  atendidas: number;
  pendientes: number;
  porcentaje: number;
};

type ReportsViewProps = {
  reportDate: string;
  reportSpecialty: string;
  reportStatus: ReportStatusFilter;
  reportAppointments: Appointment[];
  reportStats: ReportStats;
  specialties: Specialty[];
  specialtyName: (id: string) => string;
  doctorName: (id: string) => string;
  onReportDateChange: (value: string) => void;
  onReportSpecialtyChange: (value: string) => void;
  onReportStatusChange: (value: ReportStatusFilter) => void;
};

type StatCardProps = {
  label: string;
  value: string | number;
  colorClass: string;
};

function StatCard({ label, value, colorClass }: StatCardProps) {
  return (
    <div className="rounded-md border border-slate-300 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}

export function ReportsView({
  reportDate, reportSpecialty, reportStatus, reportAppointments,
  reportStats, specialties, specialtyName, doctorName,
  onReportDateChange, onReportSpecialtyChange, onReportStatusChange,
}: ReportsViewProps) {
  return (
    <section className="space-y-4">
      <h1 className="mb-5 text-2xl font-bold">Reportes de Citas Médicas</h1>

      <div className="rounded-lg border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
        {/* Encabezado */}
        <div className="rounded-t-lg border-b border-slate-200 bg-slate-50 px-4 py-4">
          <h3 className="text-xl font-bold">
            <i className="bi bi-layout-text-window-reverse"></i>  Reportes
          </h3>
          <p className="text-sm text-slate-600">Filtra y genera reportes de las citas registradas</p>
        </div>

        <div className="p-4">
          {/* Estadísticas */}
          <div className="grid gap-2 md:grid-cols-4">
            <StatCard label="Total Citas" value={reportStats.total} colorClass="text-cyan-700" />
            <StatCard label="Atendidas" value={reportStats.atendidas} colorClass="text-emerald-600" />
            <StatCard label="Pendientes" value={reportStats.pendientes} colorClass="text-orange-500" />
            <StatCard label="% Atendidas" value={`${reportStats.porcentaje}%`} colorClass="" />
          </div>

          {/* Filtros */}
          <div className="no-print mt-3 grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="grid gap-1 text-xs font-semibold">
              Filtrar por Fecha
              <input type="date" value={reportDate} onChange={(e) => onReportDateChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3" />
            </label>
            <label className="grid gap-1 text-xs font-semibold">
              Filtrar por Especialidad
              <select value={reportSpecialty} onChange={(e) => onReportSpecialtyChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3">
                <option value="all">Todas las especialidades</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-xs font-semibold">
              Filtrar por Estado
              <select value={reportStatus} onChange={(e) => onReportStatusChange(e.target.value as ReportStatusFilter)} className="h-10 rounded-md border border-slate-300 px-3">
                <option value="all">Todas las citas</option>
                <option value="atendida">Atendidas</option>
                <option value="pendiente">Pendientes</option>
              </select>
            </label>
            <button onClick={() => window.print()} className="mt-5 h-10 rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white hover:bg-cyan-800">
              <i className="fa fa-print mr-1" /> Imprimir
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Total de citas encontradas: {reportAppointments.length}
          </p>

          {/* Tabla */}
          <div className="mt-2 overflow-auto rounded-md border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  {["Fecha", "Hora", "Paciente", "Documento", "Especialidad", "Doctor", "Estado"].map((h) => (
                    <th key={h} className="px-3 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-slate-500">
                      No se encontraron citas con los filtros seleccionados
                    </td>
                  </tr>
                ) : (
                  reportAppointments.map((a) => (
                    <tr key={a.id} className="border-t border-slate-100">
                      <td className="px-3 py-3">{formatDate(a.date)}</td>
                      <td className="px-3 py-3">{a.time}</td>
                      <td className="px-3 py-3">{a.patientName}</td>
                      {/* ✅ Bug corregido: comparación booleana reemplazada por ternario */}
                      <td className="px-3 py-3">
                        {a.documentType === "cedula" ? "Céd" : "Psprt"}: {a.documentNumber}
                      </td>
                      <td className="px-3 py-3">{specialtyName(a.specialtyId)}</td>
                      <td className="px-3 py-3">{doctorName(a.doctorId)}</td>
                      <td className="px-3 py-3">
                        <span className={
                          a.status === "atendida"
                            ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                        }>
                          {a.status === "atendida" ? "Atendida" : "Pendiente"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}