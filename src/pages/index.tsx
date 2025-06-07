import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import sharedStyle from "@/styles/shared.module.css";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Head>
        <title>Eatmoji😆</title>
        <meta property="og:title" content="Eatmoji" />
        <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <meta property="og:image" content="/favicon_logo.png" />
      </Head>
      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <img 
          className={style.logo} 
          style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.9)",
          }} 
          src="/favicon_logo.png" 
          alt="Logo" 
        />
        <button
          type="button"
          className={style.buttonStart}
          onClick={() => router.push('/main')}
        >
          <p className="text-black text-center font-inter text-[16px] font-medium tracking-wide leading-none">로그인없이</p>
          <div className="text-black text-center font-inter text-[40px] font-semibold tracking-tight leading-none">시작하기</div>  
        </button>
        <button
          type="button"
          className={style.buttonLogin}
          onClick={() => router.push('/login')}
        >
          <p>로그인 / 회원가입</p>
        </button>
      </div>
    </>
  );
}