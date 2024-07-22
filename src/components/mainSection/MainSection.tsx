import Image from "next/image";

export default function MainSection() {
  return (
    <div className="flex w-full h-full min-h-[40vh] justify-center items-center relative">
      <div className="flex flex-col w-full h-full justify-center items-center z-[1]">
        <span className="text-sm uppercase tracking-[0.64rem]">
          FRONT-END DEVELOPER
        </span>
        <h1 className="text-[3.25rem] leading-tight">Gabriel Rodrigues</h1>
        <span className="text-lg">
          Elevando a <span className="text-[#FAFF00]">Performance</span> e{" "}
          <span className="text-[#FAFF00]">Funcionalidade</span> na Web
        </span>
      </div>
      <div className="absolute top-[22%] left-0">
        <Image alt="Linhas primeira dobra" src="/images/mainSection/mainSectionLines.svg" width={0} height={0} sizes="100%" className="w-[600px] h-auto"/>
      </div>
      <div className="absolute bottom-0 right-[5%]">
        <Image alt="Ícone de código" src="/images/mainSection/mainSectionCode.svg" width={0} height={0} sizes="100%" className="w-[300px] h-auto"/>
      </div>
    </div>
  );
}
