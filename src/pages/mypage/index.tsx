import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";

export default function Mypage() {
    const router = useRouter();
    
    return (
        <>
            <Head>
                <title>Eatmoji😆</title>
                <meta property="og:title" content="Eatmoji" />
                <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
                <meta property="og:image" content="/favicon_logo.png" />
            </Head>
            <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
                <h1 className={style.title}>마이페이지</h1>

                <div className={style.profileBox}>
                    <div className={style.profileIcon}>🍽️</div>
                    <div className={style.nickname}>닉네임</div>
                    <div className={style.email}>nickname@gmail.com</div>
                </div>

                <div className={style.menuList}>
                    <div className={style.menuItem} onClick={() => router.push("/mypage/profile")}>
                        <span>프로필 관리</span>
                        <span className={style.arrow}>›</span>
                    </div>
                    <div className={style.menuItem} onClick={() => router.push("/mypage/history")}>
                        <span>추천 기록</span>
                        <span className={style.arrow}>›</span>
                    </div>
                </div>
            </div>
        </>
    )
}