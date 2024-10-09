export default function ToolsSection() {
  const items = [
    { text: 'NextJs', style: 'absolute left-[2px] text-[36px]' },
    { text: 'Puppeteer', style: 'absolute top-[25px] left-[125px]' },
    { text: 'NPM', style: 'absolute top-[24px] left-[212px] text-[24px]' },
    { text: 'Tailwind CSS', style: 'absolute top-[52px] left-[18px]' },
    { text: 'Vercel', style: 'absolute top-[67px] left-[145px]' },
    { text: 'MongoDB', style: 'absolute top-[65px] left-[232px]' },
    { text: 'Typescript', style: 'absolute top-[80px] left-[50px]' },
    { text: 'JavaScript', style: 'absolute top-[85px] left-[155px] text-[36px]' },
    { text: 'Node.js', style: 'absolute top-[120px] left-[50px] text-[24px]' },
    { text: 'Git', style: 'absolute top-[148px] left-[135px]' },
    { text: 'PWA (Progressive Web Apps)', style: 'absolute top-[145px] left-[168px]' },
    { text: 'Redux', style: 'absolute top-[170px] left-[20px]' },
    { text: 'API', style: 'absolute top-[177px] left-[83px]' },
    { text: 'Moment.js', style: 'absolute top-[186px] left-[124px]' },
    { text: 'HTML', style: 'absolute top-[177px] left-[210px]' },
    { text: 'CSS', style: 'absolute top-[190px] left-[265px]' },
    { text: 'React', style: 'absolute top-[200px] left-[2px] text-[36px]' },
    { text: 'Postman', style: 'absolute top-[220px] left-[155px]' },
  ];

  function getRandomDelay() {
    return `${(Math.random() * 6).toFixed(2)}s`;
  }

  return (
    <div className="flex w-full justify-between items-center gap-6 max-md:flex-col">
      <div className="flex flex-col justify--center gap-3 max-w-[600px]">
        <h2 className="text-[2.625rem] leading-none">
          <span className="text-[#FAFF00]">Habilidades</span> e Ferramentas
        </h2>
        <span className="text-lg text-[#959595]">
        Sinta-se livre para checar as ferramentas utilizadas na base de alguns projetos pessoais e profissionais. Para uma descrição mais detalhada, por favor, me contate. Terei prazer em atender e entender! 
        </span>
      </div>
      <div className="w-[340px] h-[260px] text-[14px] font-normal relative">
      {items.map((item, index) => (
        <span
          key={index}
          className={`${item.style} animate-random-scale`}
          style={{ animationDelay: getRandomDelay() }}
        >
          {item.text}
        </span>
      ))}
      </div>
    </div>
  );
}
