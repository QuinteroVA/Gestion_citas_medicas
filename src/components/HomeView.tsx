type HomeViewProps = {
  onGoRegistro: () => void;
  onGoReportes: () => void;
};

export function HomeView({ onGoRegistro, onGoReportes }: HomeViewProps) {
  return (
    <section className="pb-4 pt-4 text-center">
      <h2 className="text-3xl font-bold">Administración de Citas Medicas</h2>
      <p className="mx-auto mt-2 max-w-3xl text-lg leading-relaxed text-slate-700">
        Registra, consulta y genera reportes.
      </p>
      <div className="mx-auto mt-10 grid max-w-2xl gap-6 md:grid-cols-2">
        <button onClick={onGoRegistro} className="rounded-2xl border border-slate-200 bg-white p-10 text-left shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
          <div className="mx-auto flex h-15 w-15 items-center justify-center">
            <img src="/image/registro.png" className="h-full w-full object-contain mb-7"/>
          </div>
          <h3 className="text-2xl font-bold">Registro de Citas</h3>
          <p className="mt-3 text-slate-600">Registra nuevas citas medicas y gestiona atencion de pacientes.</p>
          <p className="mt-4 font-semibold text-cyan-700">Ir al Registro</p>
        </button>
        <button onClick={onGoReportes} className="rounded-2xl border border-slate-200 bg-white p-10 text-left shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
          <div className="mx-auto flex h-15 w-15 items-center justify-center">
            <img src="/image/reporte.png" className="h-full w-full object-contain mb-7"/>
          </div>
          <h3 className="text-2xl font-bold">Reportes</h3>
          <p className="mt-3 text-slate-600">Consulta y genera reportes por fecha, especialidad y estado.</p>
          <p className="mt-4 font-semibold text-cyan-700">Ver Reportes</p>
        </button>
      </div>
    </section>
  );
}