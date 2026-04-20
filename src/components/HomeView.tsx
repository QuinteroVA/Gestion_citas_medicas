type HomeViewProps = {
  onGoRegistro: () => void;
  onGoReportes: () => void;
};

type CardItem = {
  img: string;
  title: string;
  description: string;
  linkText: string;
  onClick: () => void;
};

export function HomeView({ onGoRegistro, onGoReportes }: HomeViewProps) {
  const cards: CardItem[] = [
    {
      img: "/image/registro.png",
      title: "Registro de Citas",
      description: "Registra nuevas citas médicas y gestiona la atención de pacientes.",
      linkText: "Ir al Registro",
      onClick: onGoRegistro,
    },
    {
      img: "/image/reporte.png",
      title: "Reportes",
      description: "Consulta y genera reportes por fecha, especialidad y estado.",
      linkText: "Ver Reportes",
      onClick: onGoReportes,
    },
  ];

  return (
    <section className="py-4 text-center">
      <h2 className="text-3xl font-bold">Administración de Citas Médicas</h2>
      <p className="mx-auto mt-2 max-w-3xl text-lg leading-relaxed text-slate-700">
        Registra, consulta y genera reportes.
      </p>

      <div className="mx-auto mt-10 grid max-w-2xl gap-6 md:grid-cols-2">
        {cards.map((card) => (
  <button
    key={card.title}
    onClick={card.onClick}
    className="rounded-2xl border border-slate-200 bg-white p-10 text-left shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:shadow-lg transition-shadow"
    /*className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"*/
  >
    <img
      src={card.img}
      alt={card.title}
      className="mb-7 h-15 w-15 object-contain mx-auto block" // ← agregar mx-auto block
    />
    <h3 className="text-2xl font-bold">{card.title}</h3>
    <p className="mt-3 text-slate-600">{card.description}</p>
    <p className="mt-4 font-semibold text-cyan-700">{card.linkText}</p>
  </button>
  
))}
      </div>
    </section>
  );
}