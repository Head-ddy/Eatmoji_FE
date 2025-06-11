/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./[id].module.css";
import { useEffect, useState } from "react";
import { addressOptions, districts } from "@/data/regions";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/router";
import { HistoryItem } from "@/types/history";

export default function HistoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id && typeof id === "string") {
        const stored = sessionStorage.getItem("selectedHistoryItem");
        if (stored) {
        const item: HistoryItem = JSON.parse(stored);
        setSelectedItem(item);

        const key = `favorite_${item.recommendation.food}`;
        setIsFavorite(!!localStorage.getItem(key));
        }
    }
    }, [id]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
  }

  const goToEat = () => {
    if (!selectedItem) return;
    const query = `${selectedCity} ${selectedDistrict} ${selectedItem.recommendation.food}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://map.kakao.com/?=${encodedQuery}`;

    window.open(url, '_black');
  }

  useEffect(() => {
    if (selectedItem) {
        setIsFavorite(selectedItem.liked);
    }
    }, [selectedItem]);

  const handleFavorite = () => {
    if (!selectedItem) return;
    const key = `favorite_${selectedItem.id}`;
    if (isFavorite) {
      localStorage.removeItem(key);
      setIsFavorite(false);
    } else {
      localStorage.setItem(key, "true");
      setIsFavorite(true);
    }
  }

  const districtOptions = selectedCity ? districts[selectedCity] || [] : [];

  if (!selectedItem) {
    // 로딩 중일 때 보여줄 화면
    return (
      <div className={`${sharedStyle.sharedContainer} ${style.loadingContainer}`}>
        <div className={style.loader}></div>
        <p className={style.description}>추천 기록을 불러오는 중입니다... 🍽️</p>
      </div>
    );
  }
  
  return (
    <>
        <Head>
            <title>Eatmoji😆</title>
            <meta property="og:title" content="Eatmoji" />
            <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
            <meta property="og:image" content="/favicon_logo.png" />
        </Head>
        <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
            <button className={style.backButton} onClick={() => router.back()}>
                목록으로
            </button>
            <button className={style.favoriteButton} onClick={handleFavorite}>
                {isFavorite ? (
                    <AiFillStar size={24} color="#FFD700" />
                ) : (
                    <AiOutlineStar size={24} color="#ccc" />
                )}
                즐겨찾기
            </button>
            <div className={style.content}>
                <img className={style.image} src="/favicon_logo.png" alt="Logo" />
                <div className={style.card}>
                    <h2 className={style.foodTitle}>{selectedItem.recommendation.food}</h2>

                    <div className={style.detailRow}>
                        <span className={style.label}>감정</span>
                        <span>{selectedItem.emotion}</span>
                    </div>

                    <div className={style.detailRow}>
                        <span className={style.label}>추천 이유</span>
                        <span>{selectedItem.recommendation.reason}</span>
                    </div>

                    <div className={style.detailRow}>
                        <span className={style.label}>날짜</span>
                        <span>
                            {new Date(selectedItem.createdAt).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>

                    <div className={style.detailRow}>
                        <span className={style.label}>시간</span>
                        <span>
                            {new Date(selectedItem.createdAt).toLocaleTimeString("ko-KR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <button className={`${style.menulinkButton} ${style.makeButton}`}>
                    만들러가기
                </button>
                <button className={`${style.menulinkButton} ${style.goEatButton}`} onClick={openModal}>
                    먹으러가기
                </button>
                {isOpen && (
                    <div className={style.modalOverlay} onClick={closeModal}>
                        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                            <h1 className={style.modalTitle}>지역을 선택해주세요</h1>
                            <label className={style.modalLabel}>
                                <span>시: </span>
                                <select 
                                    className={style.selectBox}
                                    value={selectedCity} 
                                    onChange={handleCityChange}
                                >
                                    <option value="">--선택--</option>
                                    {addressOptions.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                    ))}
                                </select>
                            </label>

                            <label className={style.modalLabel}>
                                <span>구: </span>
                                <select
                                    className={style.selectBox}
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    disabled={!selectedCity}
                                >
                                    <option value="">--선택--</option>
                                    {districtOptions.map((district) => (
                                        <option key={district} value={district}>
                                        {district}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className={style.modalButtons}>
                                <button className={`${style.modalButton} ${style.cancel}`} onClick={closeModal}>닫기</button>
                                <button className={style.modalButton} onClick={goToEat}>식당 보러가기</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
);
}
