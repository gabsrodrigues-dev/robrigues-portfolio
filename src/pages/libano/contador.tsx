import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FlipNumbers from "react-flip-numbers";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";

type FallingImage = {
  id: number;
  size: number;
  left: number;
  blur: number;
  opacity: number;
  duration: number;
  startAngle: number;
  endAngle: number;
};

export default function Home() {
  const [total, setTotal] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [fallingImages, setFallingImages] = useState<FallingImage[]>([]);
  const typedTexts = [
    "CARREIRAS TRANSFORMADAS",
    "ALUNOS REALIZADOS",
    "TRAJETÓRIAS ENRIQUECIDAS",
    "POTENCIAIS DESBLOQUEADOS",
    "OPORTUNIDADES AMPLIADAS",
    "VIDAS IMPACTADAS",
    "FUTUROS ELEVADOS",
    "METAS ALCANÇADAS",
    "HISTÓRIAS INSPIRADAS",
    "CONQUISTAS CELEBRADAS",
    "DESAFIOS SUPERADOS",
    "MUDANÇAS REVOLUCIONADAS",
    "OBJETIVOS CONCRETIZADOS",
    "REALIZAÇÕES VALORIZADAS",
    "SUCESSOS COMPARTILHADOS",
    "PROJETOS CONSTRUÍDOS",
    "TRANSFORMAÇÕES PROMOVIDAS",
    "JORNADAS MOTIVADAS",
    "ASPIRAÇÕES REALIZADAS",
    "DESCOBERTAS ESTIMULADAS",
    "TALENTOS APERFEIÇOADOS",
    "AMBIÇÕES POTENCIALIZADAS",
    "EXPERIÊNCIAS ENRIQUECIDAS",
    "LEGADOS SOLIDIFICADOS",
    "CONQUISTADORES RECONHECIDOS",
    "VITÓRIAS CELEBRADAS",
    "ESCOLHAS VALIDADAS",
    "HABILIDADES DESENVOLVIDAS",
    "FUTUROS CONSTRUÍDOS"
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetX = useRef<number>(0);
  const targetY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);
  const contrastRef = useRef<HTMLDivElement>(null);

  // Função de interpolação linear (lerp)
  const lerp = (start: number, end: number, amt: number) => {
    const result = (1 - amt) * start + amt * end;
    if (result < 0.01) return 0;
    return Number(result.toFixed(3));
  };

  useEffect(() => {
    const qty = Math.floor(Math.random() * 6) + 4;
    const tempImages: FallingImage[] = [];
    for (let i = 0; i < qty; i++) {
      let size = 0;
      if (Math.random() > 0.5) {
        size = Math.floor(Math.random() * (800 - 600 + 1)) + 600;
      } else {
        size = Math.floor(Math.random() * (600 - 120 + 1)) + 120;
      }
      const blurVal = size / 40;
      const opacityVal = 1 - size / 1000;
      const startAngle = Math.floor(Math.random() * (10 - -40 + 1)) + -40;
      const endAngle = Math.floor(Math.random() * (40 - -10 + 1)) + -10;
      const duration = Math.random() * 6 + 5;
      let left = 0;
      if (i < qty / 2) {
        left = Math.random() * 50;
      } else {
        left = 50 + Math.random() * 50;
      }
      tempImages.push({
        id: i,
        size,
        left,
        blur: blurVal,
        opacity: opacityVal < 0 ? 0 : opacityVal,
        duration,
        startAngle,
        endAngle
      });
    }
    setFallingImages(tempImages);
  }, []);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.get(
          "https://api.libanoeducacional.com.br/fl-student-view/students?limit=1&page=1&aggregate=%5B%7B%22%24match%22%3A%7B%22deletedAt%22%3Anull%2C%22%24or%22%3A%5B%7B%22student.candidate%22%3Anull%7D%2C%7B%22student.candidate%22%3Afalse%7D%5D%7D%7D%2C%7B%22%24match%22%3A%7B%22%24or%22%3A%5B%7B%22Matriculation.situation.candidate%22%3Anull%7D%2C%7B%22Matriculation.situation.candidate%22%3Afalse%7D%5D%7D%7D%2C%7B%22%24sort%22%3A%7B%22createdAt%22%3A-1%7D%7D%5D"
        );
        const apiTotal = response.data?.metadata?.paginate?.total ?? 0;
        if (apiTotal !== total) {
          setPulse(true);
          setTimeout(() => setPulse(false), 500);
        }
        setTotal(apiTotal);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotal();
    const intervalId = setInterval(fetchTotal, 3000);
    return () => clearInterval(intervalId);
  }, [total]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      currentX.current = lerp(currentX.current, targetX.current, 0.1);
      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      if (containerRef.current && contrastRef.current) {
        containerRef.current.style.transform = `scale(${
          isHovered ? 1.3 : 1
        }) translate(${currentX.current}px, ${currentY.current}px)`;
        contrastRef.current.style.filter = isHovered
          ? "contrast(1.1) saturate(1.1) hue-rotate(5deg)"
          : "none";
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (window.innerWidth >= 768 && containerRef.current) {
      setIsHovered(true);
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      targetX.current = (mouseX - rect.width / 2) / 10;
      targetY.current = (mouseY - rect.height / 2) / 10;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isHovered && window.innerWidth >= 768 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top + 500;
      targetX.current = (mouseX - rect.width / 2) / 10;
      targetY.current = (mouseY - rect.height / 2) / 10;
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && containerRef.current) {
      setIsHovered(false);
      targetX.current = 0;
      targetY.current = 0;
    }
  };

  const formattedTotal = String(total).padStart(6, "0");

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50 transition-all duration-300 ease-out overflow-x-hidden"
      ref={containerRef}>
      <style jsx global>{`
        * {
          user-select: none;
        }
        @media (max-width: 640px) {
          h1 {
            font-size: 1.6rem !important;
            margin-bottom: 1rem !important;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes popIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(5px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(5px);
          }
        }
        @keyframes socialIn {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes wave {
          0%,
          100% {
            transform: rotate(-0.7deg);
          }
          50% {
            transform: rotate(0.7deg);
          }
        }
        .animate-wave {
          animation: wave 4s infinite ease-in-out alternate;
        }
        .bg-animated-gradient {
          background: linear-gradient(
            -45deg,
            #ee7752,
            #e73c7e,
            #23a6d5,
            #23d5ab
          );
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .animate-popIn {
          animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-socialIn {
          animation: socialIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse {
          animation: pulse 0.5s ease-in-out;
        }
        .link-hover {
          transition: all 0.3s ease;
          position: relative;
        }
        .link-hover:hover {
          transform: translateY(-2px);
        }
        .link-hover::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ec4899;
          transition: width 0.3s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
        @keyframes socialGroupIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-socialGroup {
          animation: socialGroupIn 0.6s ease-out both;
        }
        @keyframes fallAll {
          0% {
            transform: translateY(-100%) rotate(calc(var(--startAngle) * 1deg));
          }
          100% {
            transform: translateY(120vh) rotate(calc(var(--endAngle) * 1deg));
          }
        }
        .falling-image {
          position: absolute;
          top: 0;
          pointer-events: none;
          animation-name: fallAll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .vignette::after {
          content: "";
          position: fixed;
          top: 0;
          height: 100vh;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }
      `}</style>

      <main className="flex-grow">
        <div className="">
          <div className="vignette">
            <section
              ref={contrastRef}
              className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-animated-gradient text-white text-center px-4 transition-all duration-300 ease-out">
              <h1 className="text-4xl font-extrabold mb-6 tracking-[5px] drop-shadow-lg animate-wave">
                NOSSOS ALUNOS
              </h1>
              <div className="absolute inset-0 overflow-hidden">
                {fallingImages.map((img) => (
                  <img
                    key={img.id}
                    src="/images/libano/logo.webp"
                    alt="Falling"
                    style={
                      {
                        "--startAngle": img.startAngle,
                        "--endAngle": img.endAngle,
                        left: `${img.left}%`,
                        width: `${img.size}px`,
                        height: `${img.size}px`,
                        filter: `blur(${img.blur}px)`,
                        opacity: img.opacity,
                        animationDuration: `${img.duration}s`
                      } as React.CSSProperties
                    }
                    className="falling-image"
                  />
                ))}
              </div>
              <div
                className={`flex items-center justify-center ${
                  pulse ? "animate-pulse" : ""
                }`}>
                <div className="transition-all">
                  <div
                    className="bg-black bg-opacity-15 rounded-3xl rounded-tl-none rounded-br-none p-4 shadow-xl animate-float md:transform transition-transform duration-300 ease-out"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}>
                    <FlipNumbers
                      height={50}
                      width={48}
                      color="#fff"
                      play
                      perspective={1000}
                      numbers={formattedTotal}
                    />
                  </div>
                </div>
              </div>
              <h2 className="z-[2] text-lg font-extrabold mt-6 tracking-[6px] drop-shadow-lg animate-wave">
                <span className="opacity-0">.</span>
                <Typewriter
                  words={typedTexts}
                  loop={0}
                  typeSpeed={100}
                  deleteSpeed={40}
                  delaySpeed={4000}
                />
              </h2>
            </section>
          </div>
        </div>
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl w-full mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fadeIn">
              Compartilhe com seus amigos
            </h2>
            <p className="text-gray-600 mb-8">
              Espalhe a novidade e ajude mais pessoas a conhecerem a Faculdade
              Líbano!
            </p>
            <div className="flex items-center justify-center space-x-6 text-white animate-socialGroup">
              <a
                href="https://facebook.com"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:-translate-y-[3px] hover:drop-shadow-2xl hover:scale-[1.02]">
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://x.com"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-gray-800 hover:bg-gray-900 hover:-translate-y-[3px] hover:drop-shadow-2xl hover:scale-[1.02]">
                <FaXTwitter className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-pink-500 hover:bg-pink-600 hover:-translate-y-[3px] hover:drop-shadow-2xl hover:scale-[1.02]">
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 bg-blue-700 hover:bg-blue-800 hover:-translate-y-[3px] hover:drop-shadow-2xl hover:scale-[1.02]">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t animate-fadeInUp">
        <div className="max-w-7xl w-full mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Gabriel Rodrigues.
          </p>
          <nav className="flex space-x-4 text-sm">
            <a
              href="https://faculdadelibano.edu.br/"
              className="text-gray-500 hover:text-pink-500 link-hover">
              Faculdade Líbano
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
