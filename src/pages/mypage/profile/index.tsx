import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { UserProfileData } from "@/types/profile";
import { getProfile } from "@/lib/api/profile";

export default function Profile() {
    const router = useRouter();
    const email = useUserStore((state) => (state.email));

    const [profile, setProfile] = useState<UserProfileData>({
        category: [],
        flavor: [],
        disease: [],
        allergy: [],
    });

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error("프로필 불러오기 실패:", error);
        }
        };

        fetchProfile();
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
                <div className={style.header}>프로필 관리</div>

                <div className={style.profileIconBox}>
                    <div className={style.iconWrapper}>
                        <div className={style.profileIcon}>🍽️</div>
                    </div>
                        <div className={style.label}>{email}</div>
                </div>

                <hr className={style.separator} />

                <div className={style.profileTags}>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>카테고리</span>
                        <div className={style.tagGroup}>
                            {profile.category.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>맛</span>
                        <div className={style.tagGroup}>
                            {profile.flavor.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>식이요법</span>
                        <div className={style.tagGroup}>
                            {profile.disease.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.tagbox}>
                        <span className={style.tagLabel}>알레르기</span>
                        <div className={style.tagGroup}>
                            {profile.allergy.map((item: string, idx: number) => (
                                <span key={idx} className={style.tag}>{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className={style.retryButton} onClick={() => router.push('/mypage/profile/personalInfo')}>다시 입력하기</button>

                <hr className={style.separator} />
            </div>
        </>
    );
}
