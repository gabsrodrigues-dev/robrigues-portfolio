import MainSection from "@/components/mainSection/MainSection";
import HeaderSection from "@/components/headerSection/HeaderSection";
import AboutMeSection from "@/components/aboutMeSection/AboutMeSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-center gap-12 pb-12">
      <HeaderSection />
      <main className="flex flex-col w-full items-center justify-center gap-12 max-w-[1170px] max-md:px-[5vw]">
        <MainSection />
        <AboutMeSection />
      </main>
    </main>
  )
}
