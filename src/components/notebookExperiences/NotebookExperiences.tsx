import Image from "next/image";
import StickyBox from "react-sticky-box";
import { useState, useEffect } from "react";
import AbsoluteNotebookSpans from "../absoluteNotebookSpans/AbsoluteNotebookSpans";

export default function NotebookExperiences({ translations }: any) {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [lastExperience, setLastExperience] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateStep, setAnimateStep] = useState(0);

  const [scrollPercentage, setScrollPercentage] = useState(0);

  const sections = translations.notebookExperiences.sections;
  const chunkSize = 3;
  const experiences: any[] = [];
  for (let i = 0; i < sections.length; i += chunkSize) {
    experiences.push(sections.slice(i, i + chunkSize));
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const stepHeight = window.innerHeight;

    const newExperience = Math.min(3, Math.floor(scrollTop / stepHeight));
    const calculatedExperience = newExperience <= 1 ? 0 : newExperience - 1;

    if (calculatedExperience !== currentExperience) {
      setIsAnimating(true);
      setLastExperience(currentExperience);
      setCurrentExperience(calculatedExperience);
    }

    const percentage = ((scrollTop % stepHeight) / stepHeight) * 100;
    setScrollPercentage(percentage); 

    const resumeScrollVerifier = document.getElementById("resumeScrollVerifier");
    if (resumeScrollVerifier) {
      const windowHeight = window.innerHeight;
      const resumeScrollTop = resumeScrollVerifier.getBoundingClientRect().top;
      const resumeScrollBottom =
        resumeScrollVerifier.getBoundingClientRect().bottom;

      if (resumeScrollTop < 0 && resumeScrollBottom - windowHeight > 0) {
        console.log(`Porcentagem até o próximo step: ${percentage.toFixed(2)}%`);
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
      style={{ height: "400vh" }}
    >
      <div className="absolute inset-0">
        <StickyBox
          offsetTop={0}
          offsetBottom={0}
          className="h-screen flex justify-center"
        >
          <div
            id="resumeSection"
            className="flex items-center w-full max-w-[1170px] md:justify-between"
          >
            <div className="min-w-[700px] relative max-md:hidden">
              <div className="bg-gradient-to-r z-[100] -ml-[200px] w-[400px] h-full from-[#070514] via-[#070514] to-transparent absolute" />
              <Image
                src="/images/notebookExperiences/notebookExperiencesNotebook.webp"
                alt="Notebook"
                width={700}
                height={500}
                className="-ml-[100px]"
              />
              <AbsoluteNotebookSpans
                translations={translations}
                scrollPercentage={scrollPercentage}
              />
            </div>

            <div className="flex flex-col h-full max-h-[500px] justify-between max-md:max-h-[380px]">
              {experiences[
                animateStep !== 1 ? currentExperience : lastExperience
              ].map((content: any, index: number) => (
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
                    } max-md:text-xl`}
                  >
                    {content.title}
                  </h3>
                  <p
                    className={`transition-all w-full text-lg ${
                      animateStep === 1
                        ? "opacity-0 translate-y-[-30%] duration-300"
                        : animateStep === 2
                        ? "translate-y-[30%] opacity-0 duration-0"
                        : "opacity-100 duration-300"
                    } ${
                      animateStep === 1 && index === 1
                        ? "delay-[60ms]"
                        : index === 2 && "delay-[90ms]"
                    } max-md:text-sm text-[#959595]`}
                  >
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
