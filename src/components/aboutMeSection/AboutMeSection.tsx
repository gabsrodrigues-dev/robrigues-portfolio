import Image from "next/image";

export default function AboutMeSection() {
  return (
    <section id="aboutMeSection" className="flex w-full justify-between items-center max-md:flex-col gap-12">
      <div className="max-md:pb-6 max-md:w-full">
        <div className="w-full h-full md:w-fit md:h-[364px]">
          <div className="relative bg-[#D9D9D9] w-full h-full max-md:p-6 md:w-[340px] md:h-[340px]">
            <Image
              src="/images/aboutMeSection/aboutMeSectionPic.webp"
              alt="Foto de Gabriel Rodrigues"
              width={340}
              height={340}
              className="md:absolute md:top-6 md:left-6 max-md:w-full max-md:h-full"
            />
            <div className="justify-end grid grid-cols-10 items-center w-full h-12 absolute top-0 left-0 px-8 max-md:px-16">
              <div className="col-span-8" />
              <div className="flex justify-center items-center">
                <div className="rounded-full w-3 h-3 bg-[#04030B] animated-size" />
              </div>
              <div className="flex justify-center items-center">
                <div className="rounded-full w-5 h-5 border-[4px] border-[#04030B] animated-border scale-105" />
              </div>
              <style jsx>{`
                .animated-size {
                  animation: sizeAnimation 3s ease-in-out infinite;
                }
                .animated-border {
                  animation: borderAnimation 4s ease-in-out infinite;
                }
                @keyframes sizeAnimation {
                  0%,
                  100% {
                    transform: scaleX(0.9) scaleY(0.9);
                  }
                  50% {
                    transform: scaleX(1.2) scaleY(1.2);
                  }
                }
                @keyframes borderAnimation {
                  0%,
                  100% {
                    transform: scaleX(1.2) scaleY(1.2);
                  }
                  50% {
                    transform: scaleX(0.9) scaleY(0.9);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-6 max-w-[480px] max-md:max-w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-fit flex-col items-end">
            <span className="text-lg leading-none">quem sou eu,</span>
            <span className="text-[2.625rem] uppercase leading-none">
              Afinal?
            </span>
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
        <p className="text-lg max-lg:text-justify">
          Eu sou um desenvolvedor independente, sempre em busca de conhecimento.
          Já possuo experiência por mais de um ano como desenvolvedor front-end,
          atuando em construção de sistemas front-end desde o início, como em
          reconstrução de sistemas em linguagens mais otimizadas.
        </p>
        <p className="text-lg max-lg:text-justify">
          Nestes projetos – principalmente nos de reconstrução –, sempre viso o
          desempenho e performance do website, visto que são projetos que
          recebem centenas de milhares de acessos todos os meses, requirindo o
          SEO de máxima excelência.
        </p>
      </div>
    </section>
  );
}
