export default function ServicesTypeSection() {
  const services = [
    {
      title: "Website para blogs",
      description:
        "A performance de blogs melhora o ranking no Google, com SEO bem implementado e código acessível."
    },
    {
      title: "Plataforma de e-commerce",
      description:
        "E-commerce deve ser rápido e seguro, com SEO, código otimizado e integração de pagamentos e envios."
    },
    {
      title: "Front-end de sistemas",
      description:
        "Front-end ágil e acessível com React e Next.js, focando em performance e usabilidade."
    },
    {
      title: "Landing Pages",
      description:
        "Landing pages otimizadas com foco em conversão, SEO e carregamento rápido."
    },
    {
      title: "Aplicações Web Progressivas",
      description:
        "PWAs oferecem carregamento instantâneo, funcionamento offline e experiência fluida."
    },
    {
      title: "Otimização para Mobile",
      description:
        "Sites otimizados para mobile, com design responsivo e carregamento rápido, adaptados a diferentes telas."
    }
  ];
  
  return (
    <div className="flex flex-col p-6 rounded gap-12 items-center">
      <div className="flex flex-col gap-3 text-center max-w-[70%]">
        <span className="text-[2.625rem] leading-none">
          Fornecendo a Você o Meu Melhor Serviço
        </span>
        <span className="text-lg">
          There are many variation of passages of Lorem Ipsum availale but the
          majority have suffered alteration in some form, by injected humor, or
          randomised words which don't look even slightly believable.
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 border-b border-gray-300 pb-6 last:border-none"
          >
            <span className="text-2xl font-semibold">{service.title}</span>
            <span className="text-lg">{service.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
