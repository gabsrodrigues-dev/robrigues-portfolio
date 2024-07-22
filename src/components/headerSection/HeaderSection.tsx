import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeaderSection() {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOptions = ["Início", "Sobre", "Resumo", "Contato"];

  const countriesLanguages = [
    { country: "Brasil", language: "Português", acronym: "br" },
    { country: "United States", language: "English", acronym: "us" },
    { country: "Spain", language: "Spanish", acronym: "es" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(
    countriesLanguages[0]
  );

  useEffect(() => {
    const handleScroll = () => {
      setFixedHeader(window.scrollY > headerHeight + window.innerHeight * 0.1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const headerElement = document.getElementById("mainHeader");
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  return (
    <>
      <header
        id="mainHeader"
        className={`flex z-10 top-0 left-0 py-3 w-full items-center justify-center transition-all duration-300 text-white ${
          fixedHeader ? "fixed slide-from-top" : ""
        }`}
      >
        <div className="flex justify-between w-full max-w-[1170px]">
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
              <span className="text-[#FAFF00]">R</span>odrigues
            </span>
          </div>
          <ul className="flex items-center justify-center gap-8">
            {headerOptions.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  option === "Início"
                    ? "text-[#FAFF00]"
                    : "hover:text-[#FAFF00]"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-3">
            <Image
              alt="Bandeira Nacional"
              src={`/images/headerSection/flags/${selectedLanguage.acronym}.svg`}
              width={0}
              height={0}
              sizes="100%"
              className="w-[23px] h-auto rounded-[4px]"
            />
            <div role="separator" className="w-[1px] h-[17px] bg-white" />
            <Image
              alt="Telefone"
              src={`/images/headerSection/phone.svg`}
              width={0}
              height={0}
              sizes="100%"
              className="w-[18px] h-auto rounded-[4px]"
            />{" "}
            <span className={`cursor-pointer text-white`}>(31) 99164-7507</span>
          </div>
        </div>
      </header>
      <div
        style={{
          height: `${headerHeight}px`,
          display: fixedHeader ? "block" : "none",
        }}
      />
    </>
  );
}
