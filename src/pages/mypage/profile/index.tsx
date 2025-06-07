import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function Profile() {
    const router = useRouter();

    const { category, flavor, disease, allergy } = router.query;

    const parsedData = useMemo(() => {
        return {
            category: category ? JSON.parse(category as string) : [],
            flavor: flavor ? JSON.parse(flavor as string) : [],
            disease: disease ? JSON.parse(disease as string) : [],
            allergy: allergy ? JSON.parse(allergy as string) : [],
        };
    }, [category, flavor, disease, allergy]);

    return (
        <>
            <Head>
                <title>Eatmoji😆</title>
                <meta property="og:title" content="Eatmoji" />
                <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
                <meta property="og:image" content="/favicon_logo.png" />
            </Head>

            <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
                <div className={style.header}>프로필 관리</div>

                <div className={style.profileIconBox}>
                    <div className={style.iconWrapper}>
                        <div className={style.profileIcon}>🍽️</div>
                    </div>
                        <div className={style.label}>닉네임</div>
                        <div className={style.label}>nickname@gmail.com</div>
                </div>

                <hr className={style.separator} />

                <div className={style.profileTags}>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>카테고리</span>
                        <div className={style.tagGroup}>
                            {parsedData.category.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>맛</span>
                        <div className={style.tagGroup}>
                            {parsedData.flavor.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>식이요법</span>
                        <div className={style.tagGroup}>
                            {parsedData.disease.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>알레르기</span>
                        <div className={style.tagGroup}>
                            {parsedData.allergy.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className={style.retryButton} onClick={() => router.push('/mypage/profile/personalInfo')}>다시 입력하기</button>

                <hr className={style.separator} />
                <button className={style.saveButton}>저장</button>
            </div>
        </>
    );
}
