import Link from "next/link";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import {
  WiTime1,
  WiTime2,
  WiTime3,
  WiTime4,
  WiTime5,
  WiTime6,
  WiTime7,
  WiTime8,
  WiTime9,
  WiTime10,
  WiTime11,
  WiTime12
} from "react-icons/wi";
import moment from "moment";

export default function FooterSection() {
  const currentHour = moment().hour();
  const timeIcons = [
    <WiTime12 key={12} size={22} />,
    <WiTime1 key={1} size={22} />,
    <WiTime2 key={2} size={22} />,
    <WiTime3 key={3} size={22} />,
    <WiTime4 key={4} size={22} />,
    <WiTime5 key={5} size={22} />,
    <WiTime6 key={6} size={22} />,
    <WiTime7 key={7} size={22} />,
    <WiTime8 key={8} size={22} />,
    <WiTime9 key={9} size={22} />,
    <WiTime10 key={10} size={22} />,
    <WiTime11 key={11} size={22} />
  ];
  const timeIcon = timeIcons[currentHour % 12];
  const onlineStatus =
    currentHour >= 7 && currentHour <= 22
      ? "Estou on-line!"
      : "Estarei disponível em breve!";

  const contacts = [
    {
      name: "(31) 99164-7507",
      link: "https://api.whatsapp.com/send?phone=5531991647507",
      icon: <FaWhatsapp size={22} />
    },
    {
      name: "gabriel14contato@gmail.com",
      link: "mailto:gabriel14contato@gmail.com",
      icon: <MdOutlineMarkEmailUnread size={22} />
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/gabsrodrigues-dev",
      icon: <PiLinkedinLogoBold size={22} />
    },
    {
      name: onlineStatus,
      icon: timeIcon
    }
  ];

  return (
    <footer className="flex w-full h-full py-24 bg-[#0E0B20] justify-center max-md:px-[5vw]">
      <div className="flex w-full max-w-[1170px] justify-between items-center">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col">
            <h2 className="text-[2.625rem] leading-none">
              Vamos Conversar Sobre o
            </h2>
            <div className="relative">
              <h2 className="text-[2.625rem] leading-none">Seu Projeto</h2>
              <div className="absolute bottom-0 left-[0px] w-[125px] h-[2px] bg-white" />
              <div className="absolute bottom-0 right-[243px] w-[52px] h-[2px] bg-white" />
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <p className="text-2xl text-white leading-none">Contato Rápido</p>
            <div className="flex flex-col gap-3 w-full">
              {contacts.map((contact, index) =>
                contact.link ? (
                  <Link
                    key={index}
                    href={contact.link}
                    className="flex items-center gap-x-3">
                    {contact.icon}{" "}
                    <p className="text-lg text-white leading-none">
                      {contact.name}
                    </p>
                  </Link>
                ) : (
                  <div key={index} className="flex items-center gap-x-3">
                    {contact.icon}{" "}
                    <p className="text-lg text-white leading-none">
                      {contact.name}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <form className="flex flex-col gap-6">
            <input className="p-3 bg-white" placeholder="E-mail"/>
            <input className="p-3 bg-white" placeholder="Assunto"/>
            <textarea className="p-3 bg-white" placeholder="Conteúdo"/>
          </form>
        </div>
      </div>
    </footer>
  );
}
