/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import Step1 from "@/components/main-steps/step1";
import Step2 from "@/components/main-steps/step2";
import Step3 from "@/components/main-steps/step3";
import { useEffect, useState } from "react";
import sharedStyle from "@/styles/shared.module.css";

export default function Main() {
  const [step, setStep] = useState(1);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  useEffect(() => {
    console.log("result changed:", result);
  }, [result]);

  const handleGenerateResult = async (selectedAnswer2: string) => {
    setStep(3);
    console.log("선택된 이모지:", selectedAnswer2);

    try {
      // const response = await fetch("/api/recommend", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ answer2 }),
      // });

      // if (!response.ok) {
      //   throw new Error("결과를 생성하는 데 실패했습니다.");
      // }

      // const data = await response.json();
      // setResult(data.result);

      // 로컬 더미 결과 (answer2 값 포함하여 출력 예시)
      const dummyResult = `메뉴는 ${selectedAnswer2} 입니다!`;
      // 실제 네트워크 호출 대신 1초 딜레이 후 결과 설정
      await new Promise((res) => setTimeout(res, 1000));
      setResult(dummyResult);
    } catch (error) {
      console.error("GPT 호출 실패:", error);
      setResult("오류가 발생했어요. 다시 시도해 주세요.");
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