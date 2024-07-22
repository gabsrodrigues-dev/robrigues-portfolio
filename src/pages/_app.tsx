import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Alatsi } from "next/font/google";

const alatsi = Alatsi({
  weight: ["400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`max-w-screen min-h-screen overflow-x-hidden bg-[#070514] ${alatsi.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
