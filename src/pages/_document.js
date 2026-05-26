import { Html, Head, Main, NextScript } from "next/document";
import TrackingAnalytics from "../components/trackingAnalytics";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/images/icon.png" />
        <TrackingAnalytics />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="text/javascript" src="/typetura.js" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
