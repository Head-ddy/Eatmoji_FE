import React from "react";
import style from "./personalInfo.module.css"; // 필요하면 CSS 분리
import { useRouter } from "next/router";

interface Props {
  onClose: () => void;
}

export default function PersonalInfoModal({ onClose }: Props) {
  const router = useRouter();

  const handleGoToPersonalInfo = () => {
    onClose();
    router.push("/mypage/profile/personalInfo");
  };

  const handleGoToHome = () => {
    onClose();
    window.location.href = "/";
  };
  
  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        <h2 className={style.modalTitle}>로그인 성공! 🎉</h2>
        <p className={style.modalText}>다음 단계로 이동할까요?</p>
        <div className={style.modalButtons}>
          <button className={style.modalButton} onClick={handleGoToPersonalInfo}>개인정보 입력</button>
          <button className={style.modalButton} onClick={handleGoToHome}>홈으로 가기</button>
        </div>
      </div>
    </div>
  );
}