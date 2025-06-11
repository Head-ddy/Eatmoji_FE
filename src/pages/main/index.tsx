/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import Step1 from "@/components/main-steps/step1";
import Step2 from "@/components/main-steps/step2";
import Step3 from "@/components/main-steps/step3";
import { useEffect, useState } from "react";
import sharedStyle from "@/styles/shared.module.css";
import { recommendByEmoji } from "@/lib/api/recommend";
import type { RecommendResponse } from "@/types/recommend";
import { useTokenStore } from "@/store/tokenStore";

export default function Main() {
  const [step, setStep] = useState(1);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [result, setResult] = useState<RecommendResponse | null>(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);
  const accessToken = useTokenStore(state => state.accessToken);

  useEffect(() => {
    console.log("result changed:", result);
  }, [result]);

  const handleGenerateResult = async (selectedAnswer2: string) => {
    setStep(3);
    console.log("선택된 이모지:", selectedAnswer2);

    try {
      const data = await recommendByEmoji(selectedAnswer2, accessToken);
      setResult(data);
    } catch (error) {
      console.error("추천 API 호출 실패:", error);
      setResult(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} setAnswer1={setAnswer1} />;
      case 2:
        return <Step2 answer1={answer1} goToStep={goToStep} setAnswer2={setAnswer2} generateResult={handleGenerateResult} />;
      case 3:
        return <Step3 result={result} goToStep={goToStep}/>;
      default:
        return null;
    }
  };
  
  return (
    <>
      <Head>
        <title>Eatmoji😆</title>
        <meta property="og:title" content="Eatmoji" />
        <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <meta property="og:image" content="/favicon_logo.png" />
      </Head>
      <div className={`${sharedStyle.sharedContainer} gap-[39px]`}>
        {renderStep()}
      </div>
    </>
  );
}