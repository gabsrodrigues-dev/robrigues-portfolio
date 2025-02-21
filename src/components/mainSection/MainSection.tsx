import Image from "next/image";

export default function MainSection({ translations }: any) {
  return (
    <section id="mainSection" className="flex w-full h-full min-h-[40vh] justify-center items-center relative text-center">
      <div className="flex flex-col w-full h-full justify-center items-center z-[1]">
        <span className="text-sm uppercase tracking-[0.64rem] max-md:tracking-widest">
          {translations.mainSection.subtitle}
        </span>
        <h1 className="text-[3.25rem] leading-tight">
          {translations.mainSection.title}
        </h1>
        <span className="text-lg">
          {translations.mainSection.descriptionPrefix}{" "}
          <span className="text-[#FAFF00]">
            {translations.mainSection.descriptionPerformance}
          </span>{" "}
          {translations.mainSection.descriptionAnd}{" "}
          <span className="text-[#FAFF00]">
            {translations.mainSection.descriptionFuncionalidade}
          </span>{" "}
          {translations.mainSection.descriptionSuffix}
        </span>
      </div>
      <div className="absolute top-[22%] left-0 max-md:top-0">
        <Image
          alt="Linhas primeira dobra"
          src="/images/mainSection/mainSectionLines.svg"
          width={0}
          height={0}
          sizes="100%"
          className="pl-2 w-[600px] h-auto"
        />
      </div>
      <div className="absolute bottom-0 right-[5%] max-md:hidden">
        <Image
          alt="Ícone de código"
          src="/images/mainSection/mainSectionCode.svg"
          width={0}
          height={0}
          sizes="100%"
          className="w-[300px] h-auto"
        />
      </div>
    </section>
  );
}
