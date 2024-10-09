import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBlog,
  FaShoppingCart,
  FaReact,
  FaFileAlt,
  FaMobileAlt
} from "react-icons/fa";
import Image from "next/image";

export default function ServicesTypeSection() {
  const servicesRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  const services = [
    {
      logo: <FaBlog />,
      title: "Website para blogs",
      description:
        "A performance de blogs melhora o ranking no Google, com SEO bem implementado e código acessível."
    },
    {
      logo: <FaShoppingCart />,
      title: "Plataforma de e-commerce",
      description:
        "E-commerce deve ser rápido e seguro, com SEO, código otimizado e integração de pagamentos e envios."
    },
    {
      logo: <FaReact />,
      title: "Front-end de sistemas",
      description:
        "Front-end ágil e acessível com React e Next.js, focando em performance e usabilidade."
    },
    {
      logo: <FaFileAlt />,
      title: "Landing Pages",
      description:
        "Landing pages otimizadas com foco em conversão, SEO e carregamento rápido."
    },
    {
      logo: <FaMobileAlt />,
      title: "Aplicações Web Progressivas",
      description:
        "PWAs oferecem carregamento instantâneo, funcionamento offline e experiência fluida."
    },
    {
      logo: <FaMobileAlt />,
      title: "Otimização para Mobile",
      description:
        "Sites otimizados para mobile, com design responsivo e carregamento rápido, adaptados a diferentes telas."
    }
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <section
      ref={servicesRef}
      className="flex flex-col p-12 rounded-3xl shadow-2xl gap-12 items-center bg-[#0E0B20] overflow-hidden group">
      <div className="flex flex-col gap-3 text-center max-w-[70%]">
        <h2 className="text-[2.625rem] leading-none">
          Fornecendo a Você o Meu Melhor Serviço
        </h2>
        <span className="text-lg text-[#959595]">
          Existem muitas variações de passagens do Lorem Ipsum disponíveis, mas
          a maioria sofreu alguma alteração, seja por inserção de humor ou
          palavras aleatórias que não parecem nem um pouco convincentes.
        </span>
      </div>
      <div
        className="w-full relative"
        style={{
          maxWidth: servicesRef.current?.clientWidth
            ? `${servicesRef.current?.clientWidth - 48 * 2}px`
            : `${1170 - 48 * 2}px`
        }}>
        <Slider ref={sliderRef} {...settings}>
          {services.map((service, index) => (
            <div key={index} className="p-6">
              <div className="flex flex-col p-12 gap-4 items-center justify-between rounded-3xl min-h-[330px]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.6) 0px 0px 20px"
              }}>
                <div className="text-6xl text-white max-h-[60px]">{service.logo}</div>
                <p className="text-2xl text-white leading-none text-center">{service.title}</p>
                <p className="text-lg text-center text-[#959595] leading-none">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="absolute top-0 left-0 flex w-fit h-full items-center">
            <div className="w-[24px] h-full bg-gradient-to-r from-[#0E0B20] to-transparent left-0 absolute" />
          <div className="p-3 cursor-pointer transition-all duration-300 -translate-x-24 opacity-0 group-hover:opacity-100 group-hover:-translate-x-10" onClick={() => sliderRef.current?.slickPrev()}>
          <Image src="/images/assets/left-arrow.svg" alt="left arrow" width={32} height={32} />
          </div>
        </div>
        <div className="absolute top-0 right-0 flex w-fit h-full items-center">
        <div className="w-[24px] h-full bg-gradient-to-l from-[#0E0B20] to-transparent right-0 absolute" />
          <div className="p-3 cursor-pointer transition-all duration-300 translate-x-24 opacity-0 group-hover:opacity-100 group-hover:translate-x-10" onClick={() => sliderRef.current?.slickNext()}>
          <Image src="/images/assets/right-arrow.svg" alt="right arrow" width={32} height={32} />
          </div>
        </div>
      </div>
    </section>
  );
}
