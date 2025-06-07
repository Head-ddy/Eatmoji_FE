import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step3.module.css";
import { useState } from "react";

export default function Step3({
  goToStep, 
  nextStep,
  setAnswer3,
}: {
  goToStep: (stepNumber: number) => void;
  nextStep: () => void;
  setAnswer3: (answer: string[]) => void;
}) {
  const options = [ "저염식(고혈압)", "저당식(당뇨)", "저지방(지방간)", "고열량 필요 (체중 증량)", "해조류 주의 (갑상선)", "가공식품 주의 (위장 건강)",  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleTag = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    setAnswer3(selectedOptions);
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
          <div className={style.inactiveStep} />
          <div className={style.inactiveStep} />
          <div className={style.activeStep} />
          <div className={style.inactiveStep} />
        </div>
        <h2 className={style.question}>주의해야 할 건강 상태를 선택해주세요</h2>
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
        <div className={style.buttonsBox}>
          <button 
            className={style.nextButton}
            onClick={() => goToStep(2)}
          >
            이전
          </button>
          <button 
            className={style.nextButton}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}