import Image from "next/image";
import StickyBox from "react-sticky-box";
import { useState, useEffect } from "react";

const experiences = [
  [
    { title: "titulo 1", description: "descrição 1" },
    { title: "titulo 2", description: "descrição 2" },
    { title: "titulo 3", description: "descrição 3" }
  ],
  [
    { title: "titulo 4", description: "descrição 4" },
    { title: "titulo 5", description: "descrição 5" },
    { title: "titulo 6", description: "descrição 6" }
  ],
  [
    { title: "titulo 7", description: "descrição 7" },
    { title: "titulo 8", description: "descrição 8" },
    { title: "titulo 9", description: "descrição 9" }
  ]
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
            className="flex items-center justify-between w-full max-w-[1170px]">
            <div className="min-w-[700px] relative">
              <div className="bg-gradient-to-r -ml-[200px] w-[400px] h-full from-[#070514] via-[#070514] to-transparent absolute" />
              <Image
                src="/images/notebookExperiences/notebookExperiencesNotebook.webp"
                alt="Notebook"
                width={700}
                height={500}
                className="-ml-[200px]"
              />
            </div>
            <div className="flex flex-col h-full max-h-[290px] justify-between">
              {experiences[
                animateStep !== 1 ? currentExperience : lastExperience
              ].map((content, index) => (
                <div key={index} className="flex flex-col items-end">
                  <h1
                    className={`transition-all text-3xl font-bold ${
                      animateStep === 1
                        ? "opacity-0 translate-y-[-30%] duration-300"
                        : animateStep === 2
                        ? "translate-y-[30%] opacity-0 duration-0"
                        : "opacity-100 duration-300"
                    } ${
                      animateStep === 1 && index === 1
                        ? "delay-[60ms]"
                        : index === 2 && "delay-[90ms]"
                    }`}>
                    {content.title}
                  </h1>
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
                    }`}>
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
