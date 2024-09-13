import MainSection from "@/components/mainSection/MainSection";
import HeaderSection from "@/components/headerSection/HeaderSection";
import AboutMeSection from "@/components/aboutMeSection/AboutMeSection";
import NotebookExperiences from "@/components/notebookExperiences/NotebookExperiences";
import ToolsSection from "@/components/toolsSection/ToolsSection"
export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-center gap-12 pb-12">
      <HeaderSection />
      <main className="flex flex-col w-full items-center justify-center gap-12 max-w-[1170px] max-md:px-[5vw]">
        <MainSection />
        <AboutMeSection />
        <NotebookExperiences />
        {/* <ToolsSection />
        <div className="h-[500vh] w-full bg-gradient-to-b from-black to-white"/> */}
      </main>
    </main>
  )
}
