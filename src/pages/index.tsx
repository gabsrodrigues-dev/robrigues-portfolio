import MainSection from "@/components/mainSection/MainSection";
import HeaderSection from "@/components/headerSection/HeaderSection";
import AboutMeSection from "@/components/aboutMeSection/AboutMeSection";
import NotebookExperiences from "@/components/notebookExperiences/NotebookExperiences";
import ToolsSection from "@/components/toolsSection/ToolsSection";
import ServicesTypeSection from "@/components/servicesTypeSection/ServicesTypeSection";
import FooterSection from "@/components/footerSection/FooterSection";
import { useState } from "react";
import br from "@/mocks/br";
import en from "@/mocks/en";
import es from "@/mocks/es";
import HeadProps from "@/components/headProps/HeadProps";
import { Language, LanguageAcronym } from "@/types/language";

interface Translations {
  br: typeof br;
  en: typeof en;
  es: typeof es;
}
const translationMap: Translations = { br, en, es };

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    country: "Brasil",
    language: "Português",
    acronym: "br",
  });

  const [translations, setTranslations] = useState<typeof br>(br);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setTranslations(translationMap[language.acronym]);
  };

  return (
    <main className="flex flex-col w-full items-center justify-center gap-12">
      <HeadProps
        titleProps={"Gabriel Rodrigues | Front-end Developer"}
        descProps={translations.mainSection.fullDescription}
        articleTags={[
          "Front-end Developer",
          "Brazil Developer",
          "ReactJs NextJs SEO Booster Developer",
          "Desenvolvedor de Ipatinga",
        ]}
      />
      <HeaderSection onLanguageChange={handleLanguageChange} />
      <main className="flex flex-col w-full items-center justify-center gap-12 max-w-[1170px] max-md:px-[5vw] pb-12">
        <MainSection translations={translations}/>
        <AboutMeSection translations={translations} />
        <NotebookExperiences translations={translations}/>
        <ToolsSection translations={translations}/>
        <ServicesTypeSection translations={translations}/>
      </main>
      <FooterSection selectedLanguage={selectedLanguage} translations={translations}/>
    </main>
  );
}
