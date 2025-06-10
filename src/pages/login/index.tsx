/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./index.module.css";
import { useAuthStore } from "@/store/authStore";
import { loginRequest } from "@/lib/api/auth";
import { useTokenStore } from "@/store/tokenStore";

interface LoginResponse {
  email: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export default function Login() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const isLoginEnabled = loginForm.email.trim() !== "" && loginForm.password.trim() !== "";
  const accessToken = useTokenStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace("/"); // 로그인 상태면 홈으로 리다이렉트
    }
  }, [accessToken, router]);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [id]: value }));
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginResponse = await loginRequest(loginForm.email, loginForm.password);
      console.log("로그인 성공:", data);
      const { accessToken, refreshToken } = data;
      useAuthStore.getState().setAuth(true, { accessToken, refreshToken }); // 로그인 성공 후 상태 업데이트
      router.push("/mypage/profile/personalInfo");
      alert("로그인 성공! 다음으로 추천에 사용될 개인정보를 입력해주세요.🤗");
    }
    catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
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
        <img className={style.logo} src="/favicon_logo.png" alt="Logo" />

        <div className={style.card}>
          <h2 className={style.title}>로그인</h2>
          <p className={style.subtitle}>감성 이모지를 통한 메뉴 추천, 지금 시작해보세요!</p>

          <form className={style.form} onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className={style.inputLabel}>
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginInputChange}
                placeholder="이메일을 입력하세요"
                className={style.inputField}
              />
            </div>

            <div>
              <label htmlFor="password" className={style.inputLabel}>
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                placeholder="비밀번호를 입력하세요"
                className={style.inputField}
              />
            </div>

            <button
              type="submit"
              disabled={!isLoginEnabled}
              className={`${style.submitButton} ${
                  isLoginEnabled ? style.submitButtonEnabled : style.submitButtonDisabled
                }`}
            >
              로그인하기
            </button>
          </form>
          <p className={style.linkText}>
              아직 계정이 없으신가요?{" "}
              <button type="button" onClick={goToSignUp} className={style.linkTextButton}>
                회원가입
              </button>
            </p>
        </div>
      </div>
    </>
  );
}