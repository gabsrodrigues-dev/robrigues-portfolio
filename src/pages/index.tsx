import MainSection from "@/components/mainSection/MainSection";
import HeaderSection from "@/components/headerSection/HeaderSection";
import AboutMeSection from "@/components/aboutMeSection/AboutMeSection";
import NotebookExperiences from "@/components/notebookExperiences/NotebookExperiences";
import ToolsSection from "@/components/toolsSection/ToolsSection"
import ServicesTypeSection from "@/components/servicesTypeSection/ServicesTypeSection";
import FooterSection from "@/components/footerSection/FooterSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-center gap-12">
      <HeaderSection />
      <main className="flex flex-col w-full items-center justify-center gap-12 max-w-[1170px] max-md:px-[5vw] pb-12">
        <MainSection />
        <AboutMeSection />
        {/* <NotebookExperiences /> */}
        <ToolsSection />
        <ServicesTypeSection />
      </main>
      <FooterSection />
    </main>
  )
}
