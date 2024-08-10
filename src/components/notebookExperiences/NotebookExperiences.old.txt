import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  [
    { title: "titulo 1", description: "descrição 1" },
    { title: "titulo 2", description: "descrição 2" },
    { title: "titulo 3", description: "descrição 3" },
  ],
  [
    { title: "titulo 4", description: "descrição 4" },
    { title: "titulo 5", description: "descrição 5" },
    { title: "titulo 6", description: "descrição 6" },
  ],
  [
    { title: "titulo 7", description: "descrição 7" },
    { title: "titulo 8", description: "descrição 8" },
    { title: "titulo 9", description: "descrição 9" },
  ],
];

export default function NotebookExperiences() {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [isFixedSection, setFixedSection] = useState(false);
  const [isAfterScrolled, setAfterScrolled] = useState(false);
  const [contentChanging, setContentChanging] = useState(false);

  const displayExperience = useMemo(() => experiences[currentExperience], [currentExperience]);

  const handleScroll = useCallback(() => {
    const thisSection = document.getElementById("ResumeVerifier");
    if (!thisSection) return;

    const thisSectionTopPosition = thisSection.offsetTop;
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;

    setAfterScrolled(scrollPosition > thisSectionTopPosition * (experiences.length + 1));

    if (
      scrollPosition >= thisSectionTopPosition &&
      scrollPosition < thisSectionTopPosition + experiences.length * screenHeight
    ) {
      setFixedSection(true);
      const newIndex = Math.floor((scrollPosition - thisSectionTopPosition) / screenHeight);
      if (newIndex !== currentExperience) {
        setCurrentExperience(newIndex);
        setContentChanging(true);
      }
    } else {
      if (scrollPosition <= thisSectionTopPosition) setCurrentExperience(0);
      setFixedSection(false);
    }
  }, [currentExperience]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleAnimationComplete = () => {
    setContentChanging(false);
  };

  return (
    <section className="w-full">
      <div
        style={{
          height: isFixedSection
            ? `${(experiences.length + 1) * 100}vh`
            : isAfterScrolled
            ? "300vh"
            : "0",
          width: isFixedSection || isAfterScrolled ? "100%" : "0",
        }}
        id="ResumeVerifier"
      />
      <div
        className={`w-full h-screen flex justify-center ${isFixedSection ? "fixed top-0 left-0 w-full will-change-transform transition-transform duration-200 ease-in-out" : ""}`}
      >
        <div id="Resumo" className="flex items-center justify-between w-full max-w-[1170px]">
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
          <div className="flex flex-col h-full max-h-[290px] justify-center">
            <AnimatePresence onExitComplete={handleAnimationComplete}>
              {!contentChanging && (
                <motion.div
                  className="flex flex-col h-full justify-between items-end"
                  key={currentExperience}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {displayExperience.map((content, index) => (
                    <div key={index} className="flex flex-col items-end">
                      <h1 className="text-3xl font-bold">{content.title}</h1>
                      <p className="text-lg">{content.description}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
