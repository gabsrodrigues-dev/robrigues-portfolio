// components/FooterSection.jsx

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
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
import emailjs from "@emailjs/browser";

export default function FooterSection({ translations, selectedLanguage }: any) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState<null | string>(null);

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
    currentHour >= 6 && currentHour <= 23
    ? translations.footerSection.contacts.onlineStatus
    : translations.footerSection.contacts.offlineStatus;

  const contacts = [
    {
      name: translations.footerSection.contacts.whatsapp,
      link: "https://api.whatsapp.com/send?phone=5531991647507",
      icon: <FaWhatsapp size={22} />
    },
    {
      name: translations.footerSection.contacts.email,
      link: "mailto:gabriel14contato@gmail.com",
      icon: <MdOutlineMarkEmailUnread size={22} />
    },
    {
      name: translations.footerSection.contacts.linkedin,
      link: "https://www.linkedin.com/in/gabsrodrigues-dev",
      icon: <PiLinkedinLogoBold size={22} />
    },
    {
      name: onlineStatus,
      icon: timeIcon
    }
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStatusMessage(translations.footerSection.form.statusMessages.sending);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

    const templateParams = {
      from_email: email,
      subject: subject,
      message: message
    };

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (response) => {
        setStatusMessage(
          translations.footerSection.form.statusMessages.success
        );
        setEmail("");
        setSubject("");
        setMessage("");
      },
      (err) => {
        console.error("FAILED...", err);
        setStatusMessage(translations.footerSection.form.statusMessages.error);
      }
    );
  };

  return (
    <footer className="flex w-full h-full py-24 bg-[#0E0B20] justify-center max-md:px-[5vw]">
      <div className="flex w-full max-w-[1170px] justify-between md:items-end max-md:flex-col max-md:gap-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col">
            <h2 className="text-[2.625rem] leading-none">
              {translations.footerSection.titlePart1}
            </h2>
            <div className="relative">
              <h2 className="text-[2.625rem] leading-none">
                {translations.footerSection.titlePart2}
              </h2>
              {selectedLanguage.acronym === "br" && (
                <>
                  <div className="absolute bottom-0 left-[0px] w-[125px] h-[2px] bg-white" />
                  <div className="absolute bottom-0 right-[243px] w-[52px] h-[2px] bg-white" />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <p className="text-2xl text-white leading-none">
              {translations.footerSection.quickContact}
            </p>
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
        <div className="flex md:min-w-[350px] max-md:w-full">
          <form
            className="flex flex-col gap-6 w-full relative"
            onSubmit={handleSubmit}>
            <input
              disabled={statusMessage ? true : false}
              className="p-3 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 transition resize-none"
              placeholder={translations.footerSection.form.email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              disabled={statusMessage ? true : false}
              className="p-3 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 transition resize-none"
              placeholder={translations.footerSection.form.subject}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              disabled={statusMessage ? true : false}
              className="p-3 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 transition resize-none"
              placeholder={translations.footerSection.form.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              disabled={statusMessage ? true : false}
              className="bg-white text-black p-3 rounded-lg shadow-md focus:outline-none"
              type="submit">
              {statusMessage
                ? translations.footerSection.form.buttonSent
                : translations.footerSection.form.buttonSend}
            </button>
            {statusMessage && (
              <p className="text-white absolute -bottom-8 left-0">
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
}
