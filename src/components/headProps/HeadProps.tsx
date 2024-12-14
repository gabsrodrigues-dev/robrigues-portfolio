import Head from "next/head";
import { useEffect, useState } from "react";

interface TitleAndSubtitleProps {
  titleProps: string;
  descProps: string;
  articleTags: Array<string>;
}

function HeadProps(props: TitleAndSubtitleProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.titleProps}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x146"
          href={`/head/favicon-180x146.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x26"
          href={`/head/favicon-32x26.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x13"
          href={`/head/favicon-16x13.png`}
        />
        <meta name="msapplication-TileColor" content="#070514" />
        <meta name="theme-color" content={`#070514`} />
        <meta name="description" content={props.descProps} />
        <meta property="og:title" content={props.titleProps} key="title" />
        <meta property="og:description" content={props.descProps} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`Front-end ReactJs Developer Portfolio`} />
        <meta property="og:locale" content="pt_BR" />
        <meta
          property="og:article:published_time"
          content={new Date().toDateString()}
        />
        {props.articleTags.map((tag, index) => (
          <meta key={index} property="og:article:tag" content={tag} />
        ))}
        <meta property="twitter:title" content={props.titleProps} />
        <meta property="twitter:description" content={props.descProps} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={props.titleProps} />
        <meta property="og:image" content={`/head/favicon-512x414.png`} />
        <meta property="twitter:image" content={`/head/favicon-512x414.png`} />
        <meta
          name="msapplication-TileImage"
          content={`/head/favicon-512x414.png`}
        />
        <meta property="og:image:alt" content={`${props.titleProps}`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image" content={`/head/favicon-512x414.png`} />
        <meta property="twitter:image" content={`/head/favicon-512x414.png`} />
        <meta
          name="msapplication-TileImage"
          content={`/head/favicon-512x414.png`}
        />
        <meta
          property="og:image:alt"
          content={`Logo de Gabriel Rodrigues`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <link rel="canonical" href={currentUrl} />
        <link rel="manifest" content={`/head/favicon-512x414.png`} />
        <meta name="author" content={`Gabriel Rodrigues`} />
      </Head>
    </>
  );
}

export default HeadProps;
