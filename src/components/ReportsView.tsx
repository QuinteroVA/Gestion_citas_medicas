import { formatDate } from "../lib/data";
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

export function ReportsView({
  reportDate,
  reportSpecialty,
  reportStatus,
  reportAppointments,
  reportStats,
  specialties,
  specialtyName,
  doctorName,
  onReportDateChange,
  onReportSpecialtyChange,
  onReportStatusChange,
}: ReportsViewProps) {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="mb-5 text-2xl font-bold">Reportes de Citas Médicas</h1>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
        <div className="border-b border-slate-200 rounded-t-lg bg-slate-50 px-4 py-4">
          <h3 className="text-xl font-bold">Reportes</h3>
          <p className="text-sm text-slate-600">Filtra y genera reportes de las citas registradas</p>
        </div>
        <div className="p-4">
          <div className="grid gap-2 md:grid-cols-4">
            <div className="rounded-md border border-slate-300 p-3">
              <p className="text-xs text-slate-500">Total Citas</p>
              <p className="text-2xl font-bold text-cyan-700">{reportStats.total}</p>
            </div>
            <div className="rounded-md border border-slate-300 p-3">
              <p className="text-xs text-slate-500">Atendidas</p>
              <p className="text-2xl font-bold text-emerald-600">{reportStats.atendidas}</p>
            </div>
            <div className="rounded-md border border-slate-300 p-3">
              <p className="text-xs text-slate-500">Pendientes</p>
              <p className="text-2xl font-bold text-orange-500">{reportStats.pendientes}</p>
            </div>
            <div className="rounded-md border border-slate-300 p-3">
              <p className="text-xs text-slate-500">% Atendidas</p>
              <p className="text-2xl font-bold">{reportStats.porcentaje}%</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto] no-print">
            <label className="grid gap-1 text-xs font-semibold">
              Filtrar por Fecha
              <input type="date" value={reportDate} onChange={(e) => onReportDateChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3" />
            </label>
            <label className="grid gap-1 text-xs font-semibold">
              Filtrar por Especialidad
              <select value={reportSpecialty} onChange={(e) => onReportSpecialtyChange(e.target.value)} className="h-10 rounded-md border border-slate-300 px-3">
                <option value="all">Todas las especialidades</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
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
            <button onClick={() => window.print()} className="mt-5 h-10 rounded-md bg-cyan-700 px-4 text-sm font-semibold text-white">
              <i className="fa fa-print"></i> Imprimir
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-600">Total de citas encontradas: {reportAppointments.length}</p>
          <div className="mt-2 overflow-auto rounded-md border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 rounded-t-lg bg-slate-50 px-4 py-4">
                <tr>
                  <th className="px-3 py-3">Fecha</th>
                  <th className="px-3 py-3">Hora</th>
                  <th className="px-3 py-3">Paciente</th>
                  <th className="px-3 py-3">Documento</th>
                  <th className="px-3 py-3">Especialidad</th>
                  <th className="px-3 py-3">Doctor</th>
                  <th className="px-3 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {reportAppointments.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                      No se encontraron citas con los filtros seleccionados
                    </td>
                  </tr>
                )}
                {reportAppointments.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100">
                    <td className="px-3 py-3">{formatDate(a.date)}</td>
                    <td className="px-3 py-3">{a.time}</td>
                    <td className="px-3 py-3">{a.patientName}</td>
                    <td className="px-3 py-3">{a.documentType === "cedula"} {a.documentNumber}</td>
                    <td className="px-3 py-3">{specialtyName(a.specialtyId)}</td>
                    <td className="px-3 py-3">{doctorName(a.doctorId)}</td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          a.status === "atendida"
                            ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                        }
                      >
                        {a.status === "atendida" ? "Atendida" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}