import Image from "next/image";

export default function AboutMeSection() {
  return (
    <section className="flex w-full justify-between items-center">
      <div className="w-fit h-[364px]">
        <div className="relative bg-[#D9D9D9] w-[340px] h-[340px]">
          <Image
            src="/images/aboutMeSection/aboutMeSectionPic.webp"
            alt="Foto de Gabriel Rodrigues"
            width={340}
            height={340}
            className="absolute top-6 left-6"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-6 max-w-[480px]">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-fit flex-col items-end">
            <span className="text-lg leading-none">quem sou eu,</span>
            <div className="text-[2.625rem] uppercase leading-none">
              Afinal?
            </div>
          </div>
          <div>
            <Image
              alt="Linhas primeira dobra"
              src="/images/aboutMeSection/aboutMeSectionCode.svg"
              width={0}
              height={0}
              sizes="100%"
              className="w-[60px] h-auto"
            />
          </div>
        </div>
        <p className="text-lg">Eu sou um desenvolvedor independente, sempre em busca de conhecimento. Já possuo experiência por mais de um ano como desenvolvedor front-end, atuando em construção de sistemas front-end desde o início, como em reconstrução de sistemas em linguagens mais otimizadas.</p>
        <p className="text-lg">Nestes projetos – principalmente nos de reconstrução –, sempre viso o desempenho e performance do website, visto que são projetos que recebem centenas de milhares de acessos todos os meses, requirindo o SEO de máxima excelência.</p>
      </div>
    </section>
  );
}
