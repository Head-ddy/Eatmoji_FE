/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";

export default function TodayMenu() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/todaymenu/recommend");
  };

  return (
    <>
      <Head>
        <title>Eatmoji😆</title>
        <meta property="og:title" content="Eatmoji" />
        <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <meta property="og:image" content="/favicon_logo.png" />
      </Head>
      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <img className={style.logo} src="/favicon_logo.png" alt="Logo" />
        <h1 className={style.title}>오늘의 메뉴 추천 🍽️</h1>
        <p className={style.subtitle}>오늘에 딱 맞는 메뉴를 알려드릴게요!</p>
        <div className={style.emoji}>🤔 😋 🥰</div>
        <button className={style.button} onClick={handleButtonClick}>메뉴 추천받기 🍱</button>
      </div>
    </>
  );
}
