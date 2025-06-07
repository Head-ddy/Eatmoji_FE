import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step1.module.css";

export default function Step1({nextStep, setAnswer1} : {nextStep: () => void, setAnswer1: (answer: string) => void}) {
    const handleClick = (answer: string) => {
        setAnswer1(answer);
        nextStep();
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
        <h1 className={style.title}>오늘 하루, 어땠어?</h1>
        <div className={style.buttonsWrapper}>
            {["기쁨", "슬픔", "화남", "편안", "아픔"].map((emotion) => (
            <button
                key={emotion}
                className={style.button}
                onClick={() => handleClick(emotion)}
            >
                {emotion}
            </button>
            ))}
        </div>
      </div>
    </>
  );
}