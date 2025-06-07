/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useState } from "react";
import Step1 from "@/components/mypage-steps/step1";
import Step2 from "@/components/mypage-steps/step2";
import Step3 from "@/components/mypage-steps/step3";
import Step4 from "@/components/mypage-steps/step4";

export default function PersonalInfo() {
    const [step, setStep] = useState(1);
    const [answer1, setAnswer1] = useState<string[]>([]);
    const [answer2, setAnswer2] = useState<string[]>([]);
    const [answer3, setAnswer3] = useState<string[]>([]);
    const [answer4, setAnswer4] = useState<string[]>([]);

    const nextStep = () => setStep((prev) => prev + 1);
    const goToStep = (stepNumber: number) => setStep(stepNumber);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 nextStep={nextStep} setAnswer1={setAnswer1}/>;
            case 2:
                return <Step2 goToStep={goToStep} nextStep={nextStep} setAnswer2={setAnswer2}/>;
            case 3:
                return <Step3 goToStep={goToStep} nextStep={nextStep} setAnswer3={setAnswer3}/>;
            case 4:
                return <Step4 goToStep={goToStep} setAnswer4={setAnswer4} answer1={answer1} answer2={answer2} answer3={answer3}/>;
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
            <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
                {renderStep()}
            </div>
        </>
    )
}