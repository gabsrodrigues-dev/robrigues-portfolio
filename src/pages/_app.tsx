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
  const pixelId = "1267287267151160";
  const pixelAccessToken = "EAADrSzmt83oBO12GT6ZAWWa9ZCf9L6ZB9SLIzu9WrQvz3VNDL5ZBq29UCYV7RuqYYD8GNgCNzBMcisYTWWQ1AzKcXIZAVBZC0drgHQb3sWGEalgZBT32buOwMlM0RSZB0VAsW5BoYb0aHplRfTMsHZCxgGzGaOsdwLp3TCQdTsFhJuBMyvgW7EaSPnUOzqZB9vwx3wbQZDZD";

  useEffect(() => {
    const fetchOrganization = async () => {
      if (typeof window !== "undefined") {
        //GOOGLE
        const tagManagerArgs = {
          gtmId: gtmId,
        };
        TagManager.initialize(tagManagerArgs);

        //FACEBOOK
        const sendPageViewEvent = async () => {
          const pixelID = pixelId;
          const accessToken = pixelAccessToken;
          const eventPayload = {
            data: [
              {
                event_name: "PageView",
                event_time: Math.floor(Date.now() / 1000),
                user_data: {
                  client_user_agent: navigator.userAgent,
                  external_id: `${Math.floor(Date.now() / 1000)}0001`,
                },
                custom_data: {
                  page_url: window.location.href,
                  referrer: document.referrer,
                },
              },
            ],
          };
          try {
            await axios.post(
              `https://graph.facebook.com/v12.0/${pixelID}/events?access_token=${accessToken}`,
              eventPayload
            );
          } catch (error) {
            console.error("Erro ao enviar Page View evento:", String(JSON.stringify(error)));
          }
        };

        sendPageViewEvent();

        const ReactPixel = require("react-facebook-pixel");
        ReactPixel.default.init(pixelId);
        ReactPixel.default.pageView();
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