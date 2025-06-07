import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step1.module.css";
import { useState } from "react";

export default function Step1({
  nextStep,
  setAnswer1,
}: {
  nextStep: () => void;
  setAnswer1: (answer: string[]) => void;
}) {
  const options = [ "한식", "중식", "일식", "양식", "분식", "채식", ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleTag = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    setAnswer1(selectedOptions);
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
        <div className={style.progressBar}>
          <div className={style.activeStep} />
          <div className={style.inactiveStep} />
          <div className={style.inactiveStep} />
          <div className={style.inactiveStep} />
        </div>
        <h2 className={style.question}>선호하는 음식을 선택해주세요</h2>
        <div className={style.buttonsWrapper}>
          {options.map((option) => (
            <button
              key={option}
              className={`${style.button} ${
                selectedOptions.includes(option) ? style.selected : ""
              }`}
              onClick={() => handleTag(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button 
          className={style.nextButton} 
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </>
  );
}
