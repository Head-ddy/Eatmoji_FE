import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step2.module.css";

export default function Step2({answer1, goToStep, setAnswer2, generateResult} : {answer1: string, goToStep: (stepNumber: number) => void, setAnswer2: (answer: string) => void , generateResult: (emoji: string) => void}) {
  const handleClick = async (emoji: string) => {
    setAnswer2(emoji);
    await generateResult(emoji);
  }

  const getEmotionByAnswer1 = (answer1: string): string[] => {
    switch (answer1) {
      case "기쁨":
        return ["😀", "😆", "😉", "😊", "😍", "😜"];
      case "슬픔":
        return ["😢", "😥", "😭"];
      case "화남":
        return ["😠", "😡", "😑", "😒", "😕"];
      case "편안":
        return ["😌", "😐", "😇"];
      case "아픔":
        return ["😷"];
      default:
        return [];
    }
  };

  const emojiList = getEmotionByAnswer1(answer1);
  
  return (
    <>
      <Head>
        <title>Eatmoji😆</title>
        <meta property="og:title" content="Eatmoji" />
        <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <meta property="og:image" content="/favicon_logo.png" />
      </Head>
      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <button
          className={style.backButton}
          onClick={() => goToStep(1)}
        >
          이전으로
        </button>
        <h1 className={style.title}>감정에 어울리는 음식을 추천해줄게!</h1>
        <div className={style.buttonList}>
            {emojiList.map((emoji) => (
            <button
                key={emoji}
                className={style.emojiButton}
                onClick={() => handleClick(emoji)}
            >
                {emoji}
            </button>
            ))}
        </div>
      </div>
    </>
  );
}