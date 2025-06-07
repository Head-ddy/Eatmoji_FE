import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <link rel="icon" type="image/png" sizes="40x40" href="/favicon_logo.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
