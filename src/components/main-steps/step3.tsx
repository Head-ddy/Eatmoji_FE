/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./step3.module.css";
import { useState } from "react";
import { addressOptions, districts } from "@/data/regions";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import type { RecommendResponse } from "@/types/recommend";
import { useRouter } from "next/router";
import { fetchRecipeByFood } from "@/lib/api/recipe";
import { toggleLikeHistoryItem } from "@/lib/api/like";
import { useTokenStore } from "@/store/tokenStore";

export default function Step3({result, goToStep} : {result: RecommendResponse  | null, goToStep: (stepNumber: number) => void}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const isDisabled = result?.recommendations.length === 0;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const router = useRouter();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
  }

  const goToMake = async () => {
    const rawFood = result?.recommendations[0].food;
    if (!rawFood) {
      alert("추천된 음식 정보가 없습니다.");
      return;
    }

    const cleanFood = rawFood.replace(/\s/g, "");
    console.log("푸드:", cleanFood);

    try {
      const url = await fetchRecipeByFood(cleanFood);
      if (url === "Error: Recipe not found") {
        router.push("/recipe-error"); // 에러 페이지로 이동
        return;
      }
      if (!url.startsWith("http")) {
        throw new Error("잘못된 링크 형식입니다.");
      }
      window.open(url, "_blank");
    } catch (error) {
      console.error("레시피 링크 호출 실패:", error);
      alert("레시피 정보를 불러오는 데 실패했습니다.");
    }
  };


  const goToEat = () => {
    const rawFood = result?.recommendations[0].food;
    if (!selectedCity || !selectedDistrict || !rawFood) {
        alert("시와 구, 그리고 추천 결과가 모두 필요합니다.");
        return;
    }
    const cleanFood = rawFood.replace(/\s/g, "");
    console.log("푸드:", cleanFood);
    const query = `${selectedCity} ${selectedDistrict} ${cleanFood}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://map.kakao.com/?q=${encodedQuery}`;

    window.open(url, '_blank');
  }

  const handleFavorite = async (historyId: string) => {
    const accessToken = useTokenStore.getState().accessToken;

    if (!accessToken) {
      alert('로그인 후 이용 부탁드립니다.');
      return;
    }

    if (!result) return;

    try {
      const newLikeStatus = await toggleLikeHistoryItem(historyId);
      setIsFavorite(newLikeStatus);
      console.log('Like 상태가 변경되었습니다:', newLikeStatus);
    } catch (error) {
      console.error('Like 상태 변경 중 오류 발생:', error);
    }
  }

  const districtOptions = selectedCity ? districts[selectedCity] || [] : [];

  if (result === null) {
    // 로딩 중일 때 보여줄 화면
    return (
      <div className={`${sharedStyle.sharedContainer} ${style.loadingContainer}`}>
        <div className={style.loader}></div>
        <p className={style.description}>추천 결과를 생성 중입니다... 🍽️</p>
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
        <button
          className={style.backButton}
          onClick={() => {goToStep(1); router.reload();}}
        >
          처음으로
        </button>
        <button className={style.favoriteButton} onClick={() => result?.historyId && handleFavorite(result.historyId)} disabled={isDisabled}>
          {isFavorite ? (
            <AiFillStar size={24} color="#FFD700" />
          ) : (
            <AiOutlineStar size={24} color="#ccc" />
          )}
          좋아요
        </button>
        <div className={style.content}>
          {result.recommendations.length > 0 ? (
            <>
              <h1 className={style.title}>&quot;{result.recommendations[0].food}&quot;</h1>
              <img className={style.image} src="/favicon_logo.png" alt="Logo" />
              <p className={style.description}>{result.recommendations[0].reason}</p>
            </>
          ) : (
            <p>추천 결과가 없습니다.</p>
          )}
        </div>
        <div className={style.buttonContainer}>
          <button className={`${style.menulinkButton} ${style.makeButton}`} onClick={goToMake} disabled={isDisabled}>
            만들러가기
          </button>
          <button className={`${style.menulinkButton} ${style.goEatButton}`} onClick={openModal} disabled={isDisabled}>
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
