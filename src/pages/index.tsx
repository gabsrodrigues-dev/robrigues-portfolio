import MainSection from "@/components/mainSection/MainSection";
import HeaderSection from "@/components/headerSection/HeaderSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-center gap-12">
      <HeaderSection />
      <main className="flex flex-col w-full items-center justify-center gap-12 max-w-[1170px]">
        <MainSection />
      </main>
      <div className="w-full h-[1200px] bg-blue-950"/>
    </main>
  )
}
