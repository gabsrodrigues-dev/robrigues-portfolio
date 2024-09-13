import Image from "next/image";
import StickyBox from "react-sticky-box";
import { useState, useEffect } from "react";

const experiences = [
  [
    { title: "Participação e contribuição em ecossistema de ensino", description: "Aplicação de conhecimento de NodeJs, ReactJs, e Angular em sistemas em prol da educação." },
    { title: "Reconstrução de Websites em linguagens otimizadas", description: "Utilizando do framework NextJs, tenho experiência em desenvolver com fidelidade ao design original diversos sites em NextJs, visando performance e SEO." },
    {
      title: "Criação de sistemas integrados a aplicações externas",
      description:
        "Crio e gerencio aplicações com injeções DOM em aplicações externas, como a inserção de um sistema ao Whatsapp Web."
    },
  ],
  [
    {
      title: "+5 mil atualizações criadas no GitHub",
      description:
        "Cada atualização, correção, e novidade programada é um aprendizado novo."
      },
      { title: "+100.000 acessos mensais nos sistemas com minha participação", description: "Contando com minha cooperação, os sistemas no qual tive a oportunidade conseguem alcançar este alto número mensal de acessos todos os meses." },
      { title: "+1.5 anos de experiência nas linguagens Front-End", description: "Iniciando por NextJs, na qual este site foi desenvolvido, também tenho experiência front-end em ReactJs e AngularJs" }
    ],
    [
      {
        title: "Paticipação em Sistemas em escala White Label",
        description:  
          "Sistemas modulares, com milhões de requisições todos os meses."
      },
      { title: "Criação de biblioteca nacional para DEVS", description: "Instalado mais de 10 mil vezes, a biblioteca NPM br-national-services é utilizada para funções de geração e validação de itens nacionais." },
      { title: "Contrução modularizada em JS de um BOT no Whatsapp", description: "Com 9 meses de idade, o BOT a partir de prompts de texto, utilizando I.A., é capaz de gerar texto, construir imagens, e replicar voz de diversos artistas." }
    ],
];

export default function NotebookExperiences() {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [lastExperience, setLastExperience] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateStep, setAnimateStep] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const stepHeight = window.innerHeight; //1.5
    const newExperience = Math.min(3, Math.floor(scrollTop / stepHeight));
    const calculatedExperience = newExperience <= 1 ? 0 : newExperience - 1;

    if (calculatedExperience !== currentExperience) {
      setIsAnimating(true);
      setLastExperience(currentExperience);
      setCurrentExperience(calculatedExperience);
    }

    const percentage = ((scrollTop % stepHeight) / stepHeight) * 100;

    const resumeScrollVerifier = document.getElementById(
      "resumeScrollVerifier"
    );
    if (resumeScrollVerifier) {
      const windowHeight = window.innerHeight;
      const resumeScrollTop = resumeScrollVerifier.getBoundingClientRect().top;
      const resumeScrollBottom =
        resumeScrollVerifier.getBoundingClientRect().bottom;
      console.log(resumeScrollBottom);
      if (resumeScrollTop < 0 && resumeScrollBottom - windowHeight > 0) {
        //1.5
        console.log(
          `Porcentagem até o próximo step: ${percentage.toFixed(2)}%`
        );
      }
    }
  };

  useEffect(() => {
    if (isAnimating) {
      setAnimateStep(1);

      const firstTimeout = setTimeout(() => {
        setAnimateStep(2);

        const secondTimeout = setTimeout(() => {
          setAnimateStep(0);

          const thirdTimeout = setTimeout(() => {
            setIsAnimating(false);
          }, 450);

          return () => clearTimeout(thirdTimeout);
        }, 100);

        return () => clearTimeout(secondTimeout);
      }, 450);

      return () => clearTimeout(firstTimeout);
    }
  }, [isAnimating]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentExperience]);

  return (
    <section
      id="resumeScrollVerifier"
      className="w-full relative"
      style={{ height: "400vh" }}>
      <div className="absolute inset-0">
        <StickyBox
          offsetTop={0}
          offsetBottom={0}
          className="h-screen flex justify-center">
          <div
            id="resumeSection"
            className="flex items-center w-full max-w-[1170px] md:justify-between">
              
            <div className="min-w-[700px] relative max-md:hidden">
              <div className="bg-gradient-to-r z-[100] -ml-[200px] w-[400px] h-full from-[#070514] via-[#070514] to-transparent absolute" />
              <Image
                src="/images/notebookExperiences/notebookExperiencesNotebook.webp"
                alt="Notebook"
                width={700}
                height={500}
                className="-ml-[100px]"
              />
              <div className="absolute w-[533px] h-[330px] left-[-13px] top-[28px] select-none overflow-hidden">
              <h1 className="text-3xl font-bold -mt-4 -ml-1 text-red-500">
                Vai ter algo aqui em breve</h1>
              <h1 className="text-3xl font-bold -mb-4 -mr-1 text-red-500 absolute bottom-0 right-0">
                Por enquanto, só construindo</h1>
                </div>
            </div>
            <div className="flex flex-col h-full max-h-[500px] justify-between max-md:max-h-[380px]">
              {experiences[
                animateStep !== 1 ? currentExperience : lastExperience
              ].map((content, index) => (
                <div key={index} className="flex flex-col items-end gap-1">
                  <h3
                    className={`transition-all w-full text-3xl font-bold ${
                      animateStep === 1
                        ? "opacity-0 translate-y-[-30%] duration-300"
                        : animateStep === 2
                        ? "translate-y-[30%] opacity-0 duration-0"
                        : "opacity-100 duration-300"
                    } ${
                      animateStep === 1 && index === 1
                        ? "delay-[60ms]"
                        : index === 2 && "delay-[90ms]"
                    } max-md:text-xl`}>
                    {content.title}
                  </h3>
                  <p
                    className={`transition-all text-lg ${
                      animateStep === 1
                        ? "opacity-0 translate-y-[-30%] duration-300"
                        : animateStep === 2
                        ? "translate-y-[30%] opacity-0 duration-0"
                        : "opacity-100 duration-300"
                    } ${
                      animateStep === 1 && index === 1
                        ? "delay-[60ms]"
                        : index === 2 && "delay-[90ms]"
                    } max-md:text-sm`}>
                    {content.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </StickyBox>
      </div>
    </section>
  );
}
