import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step4.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Step4({ 
  goToStep, 
  setAnswer4,
  answer1,
  answer2,
  answer3,
}: {
  goToStep: (stepNumber: number) => void;
  setAnswer4: (answer: string[]) => void;
  answer1: string[];
  answer2: string[];
  answer3: string[];
}) {
  const router = useRouter();
  const options = [ "땅콩", "대두", "호두", "캐슈넛", "생선", "갑각류", "밀", "우유", "사과", "복숭아", "바나나", ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleTag = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSave = () => {
    setAnswer4(selectedOptions);
    const query: { [key: string]: string } = {
      category: JSON.stringify(answer1),
      flavor: JSON.stringify(answer2),
      disease: JSON.stringify(answer3),
      allergy: JSON.stringify(selectedOptions),
    };
    router.push({ pathname: "/mypage/profile", query });
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
          <div className={style.inactiveStep} />
          <div className={style.activeStep} />
        </div>
        <h2 className={style.question}>주의해야 할 알레르기를 선택해주세요</h2>
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
            onClick={() => goToStep(3)}
          >
            이전
          </button>
          <button 
            className={style.nextButton} 
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}