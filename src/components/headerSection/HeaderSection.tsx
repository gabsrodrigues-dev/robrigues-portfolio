// src/components/headerSection/HeaderSection.tsx

import Image from "next/image";
import { useEffect, useState } from "react";
import MobileMenu from "./mobileMenu/MobileMenu";
import br from "@/mocks/br";
import en from "@/mocks/en";
import es from "@/mocks/es";
import { Language, LanguageAcronym } from "@/types/language";

interface HeaderSectionProps {
  onLanguageChange: (language: Language) => void; 
}

const headerOptions = [
  { key: "inicio", offset: 128, id: "mainSection" },
  { key: "sobre", offset: 130, id: "aboutMeSection" },
  { key: "resumo", offset: 0, id: "resumeSection" },
  { key: "contato", offset: 0, id: "contactSection" }
];

const countriesLanguages: Language[] = [ 
  { country: "Brasil", language: "Português", acronym: "br" },
  { country: "United States", language: "English", acronym: "en" },
  { country: "Spain", language: "Spanish", acronym: "es" }
];

const translations: { [key in LanguageAcronym]: any } = {
  br,
  en,
  es
};

export default function HeaderSection(props: HeaderSectionProps) {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [actualSection, setActualSection] = useState("mainSection");
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null); 
  const [t, setT] = useState<any>(null);

  const getDefaultLanguage = (): Language => { 
    if (typeof navigator === "undefined") return countriesLanguages[0];
    const userLang = navigator.language;
    if (userLang.includes("es")) return countriesLanguages[2];
    if (userLang.includes("en")) return countriesLanguages[1];
    return countriesLanguages[0];
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      const parsedLanguage: Language = JSON.parse(savedLanguage);
      setSelectedLanguage(parsedLanguage);
      props.onLanguageChange(parsedLanguage);
      setT(translations[parsedLanguage.acronym]);
    } else {
      const defaultLanguage = getDefaultLanguage();
      setSelectedLanguage(defaultLanguage);
      props.onLanguageChange(defaultLanguage);
      setT(translations[defaultLanguage.acronym]);
      localStorage.setItem("selectedLanguage", JSON.stringify(defaultLanguage));
    }
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      localStorage.setItem("selectedLanguage", JSON.stringify(selectedLanguage));
      setT(translations[selectedLanguage.acronym]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      setFixedHeader(window.scrollY > headerHeight + window.innerHeight * 0.1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  useEffect(() => {
    const headerElement = document.getElementById("mainHeader");
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  const handleScrollToSection = (id: string, offset: number) => {
    setActualSection(id);
    const mentionedSection = document.getElementById(id);
    if (mentionedSection) {
      const sectionTop =
        mentionedSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - offset, behavior: "smooth" });
    }
  };

  if (selectedLanguage && t)
    return (
      <>
        <header
          id="mainHeader"
          className={`flex z-10 top-0 left-0 py-3 w-full items-center justify-center px-[5vw] transition-all duration-300 ${
            fixedHeader ? "fixed slide-from-top bg-[#070514]" : ""
          }`}
        >
          <div className="flex justify-between items-center w-full max-w-[1170px]">
            <div className="flex items-center justify-center gap-3">
              <Image
                alt="Logo Page"
                src="/images/headerSection/headerSectionWebPage.svg"
                width={0}
                height={0}
                sizes="100%"
                className="w-[21px] h-auto"
              />
              <span className="text-2xl">
                <span className="text-[#FAFF00]">R</span>
                {t.header.rod}
              </span>
            </div>
            <ul className="flex items-center justify-center gap-8 max-md:hidden">
              {headerOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleScrollToSection(option.id, option.offset)
                  }
                  className={`cursor-pointer transition-all duration-300 ${
                    option.id === actualSection
                      ? "text-[#FAFF00]"
                      : "hover:text-[#FAFF00]"
                  }`}
                >
                  {t.header[option.key]}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-end gap-3 relative min-w-[220px] max-md:hidden">
              <div className="relative">
                <Image
                  alt="Bandeira Nacional"
                  src={`/images/headerSection/flags/${selectedLanguage.acronym}.svg`}
                  width={23}
                  height={17}
                  sizes="100%"
                  className="w-[23px] h-auto rounded cursor-pointer"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                />
                <div
                  className={`absolute -top-3 -left-2 w-[150px] bg-white text-black rounded overflow-hidden shadow transition-all duration-300 ${
                    languageMenuOpen
                      ? "opacity-100 visible transform scale-y-100"
                      : "opacity-0 invisible transform scale-y-0"
                  } origin-top`}
                >
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => setLanguageMenuOpen(false)}
                  >
                    <Image
                      alt={`${selectedLanguage.language} flag`}
                      src={`/images/headerSection/flags/${selectedLanguage.acronym}.svg`}
                      width={23}
                      height={17}
                      className="rounded"
                    />
                    {selectedLanguage.language}
                  </div>
                  {countriesLanguages
                    .filter(
                      (lang) => lang.acronym !== selectedLanguage.acronym
                    )
                    .map((lang) => (
                      <div
                        key={lang.acronym}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          props.onLanguageChange(lang);
                          setLanguageMenuOpen(false);
                        }}
                        className="cursor-pointer p-2 hover:bg-gray-200 flex items-center gap-2"
                      >
                        <Image
                          alt={`${lang.language} flag`}
                          src={`/images/headerSection/flags/${lang.acronym}.svg`}
                          width={23}
                          height={17}
                          className="rounded"
                        />
                        {lang.language}
                      </div>
                    ))}
                </div>
              </div>
              <div role="separator" className="w-[1px] h-[17px] bg-white" />
              <Image
                alt="Telefone"
                src={`/images/headerSection/phone.svg`}
                width={0}
                height={0}
                sizes="100%"
                className="w-[18px] h-auto rounded cursor-pointer"
                onClick={() =>
                  (window.location.href =
                    selectedLanguage.acronym === "br"
                      ? "tel:31991647507"
                      : "tel:+5531991647507")
                }
              />
              <span
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href =
                    selectedLanguage.acronym === "br"
                      ? "tel:31991647507"
                      : "tel:+5531991647507")
                }
              >
                <span
                  className={`transition-all duration-300 ${
                    selectedLanguage.acronym === "br"
                      ? "-ml-[30px] opacity-0"
                      : ""
                  }`}
                >
                  +55{" "}
                </span>
                (31) 99164-7507
              </span>
            </div>
          </div>
        </header>
        <div
          style={{
            height: `${headerHeight}px`,
            display: fixedHeader ? "block" : "none"
          }}
        />
        <MobileMenu translations={t.header} />
      </>
    );
}
