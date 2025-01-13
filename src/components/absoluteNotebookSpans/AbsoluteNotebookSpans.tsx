export default function AbsoluteNotebookSpans({
  translations,
  scrollPercentage = 0, 
  globalScroll = 0, 
  currentExperience = 0,
}: {
  translations: any;
  scrollPercentage?: number;
  globalScroll?: number;   
  currentExperience?: number; 
}) {
  const chunkMessages = [
    "Primeira Seção: Explorando nossas principais conquistas.",
    "Segunda Seção: Desenvolvimento de alto impacto e inovações.",
    "Terceira Seção: Projetos voltados para IA e automações avançadas.",
  ];

  const particles = [
    { id: 1, left: "10%", size: 8, color: "bg-pink-500" },
    { id: 2, left: "30%", size: 5, color: "bg-yellow-300" },
    { id: 3, left: "50%", size: 6, color: "bg-green-400" },
    { id: 4, left: "70%", size: 7, color: "bg-blue-400" },
    { id: 5, left: "85%", size: 4, color: "bg-red-400" },
  ];

  const getParticleBottom = () => {
    return `${globalScroll}%`;
  };

  return (
    <div className="absolute w-[535px] h-[332px] left-[-13px] top-[27px] select-none overflow-hidden bg-[#0E0B20] rounded-md shadow-md border border-[#2F2B47]">
      <h1 className="text-3xl font-bold -mt-4 -ml-1 text-red-500">
        {translations.notebookExperiences.title1}
      </h1>
      <h1 className="text-3xl font-bold -mb-4 -mr-1 text-red-500 absolute bottom-0 right-0">
        {translations.notebookExperiences.title2}
      </h1>

      <div
        className={`
          absolute top-[50%] left-[50%]
          -translate-x-1/2 -translate-y-1/2
          px-6 py-3 bg-[#1E1A35]/90 rounded-md shadow-lg
          text-white text-sm
          transition-all duration-500 ease-in-out
          ${scrollPercentage > 5 ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        `}
      >
        <p className="whitespace-nowrap font-bold text-center">
          {chunkMessages[currentExperience] || ""}
        </p>
      </div>

      <div
        className={`
          absolute bottom-5 left-0 right-0 mx-auto
          w-44 h-8 bg-pink-600/80
          flex items-center justify-center
          text-white font-bold text-sm
          rounded-md
          transition-all duration-500 ease-in-out
          ${scrollPercentage > 30 ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      >
        +30% na seção atual
      </div>

      <div
        className={`
          absolute inset-0
          bg-gradient-to-tr from-transparent to-[#7E4DD2]/20
          transition-all duration-700 ease-in-out
          pointer-events-none
          ${scrollPercentage > 40 ? "opacity-100" : "opacity-0"}
        `}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`
            absolute
            ${particle.color}
            rounded-full
            transition-all
            duration-500
            pointer-events-none
          `}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            bottom: getParticleBottom(),
          }}
        />
      ))}
    </div>
  );
}
