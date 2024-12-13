import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Alatsi } from "next/font/google";
import Cookies from "js-cookie";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import axios from "axios";

const alatsi = Alatsi({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const gtmId = "GTM-TN2F7R94";

  useEffect(() => {
    const fetchOrganization = async () => {
      if (typeof window !== "undefined") {
        //GOOGLE
        const tagManagerArgs = {
          gtmId: gtmId,
        };
        TagManager.initialize(tagManagerArgs);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const utmData: { [key: string]: string } = {};
      urlParams.forEach((value, key) => {
        utmData[key] = value;
      });

      const getUTMFromCookie = () => {
        const cookieData = Cookies.get("utm_dataJson");
        return cookieData ? JSON.parse(cookieData) : null;
      };
      const utmDataCookies = getUTMFromCookie();
      if (
        Cookies.get("utm_dataJson") == undefined ||
        utmDataCookies === null ||
        typeof utmDataCookies.utm_source === "undefined"
      ) {
        if (utmDataCookies === null) {
          Cookies.set("utm_dataJson", JSON.stringify(utmData), { expires: 7 });
        } else {
          if (
            typeof utmDataCookies.utm_source == "undefined" &&
            typeof utmData.utm_source !== "undefined"
          ) {
            Cookies.set("utm_dataJson", JSON.stringify(utmData), {
              expires: 7,
            });
          }
        }
      }
    };

    fetchOrganization();
  }, []);

  return (
    <main
      className={`max-w-screen min-h-screen bg-[#070514] text-white ${alatsi.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}