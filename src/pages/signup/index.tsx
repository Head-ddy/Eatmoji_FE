/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./index.module.css";
import { signupRequest } from "@/lib/api/auth";
import { useTokenStore } from "@/store/tokenStore";

export default function Signup() {
  type AgreementKey = "terms" | "privacy" | "marketing";

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  
  const accessToken = useTokenStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace("/"); // 로그인 상태면 홈으로 리다이렉트
    }
  }, [accessToken, router]);

  const allAgreements =
    agreements.terms && agreements.privacy && agreements.marketing;

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAgreementChange = (key: AgreementKey) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllAgreementsChange = () => {
    const newValue = !allAgreements;
    setAgreements({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const isNextEnabled = agreements.terms && agreements.privacy;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const isSubmitEnabled =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const data = await signupRequest(form.email, form.password);
      console.log("회원가입 성공:", data);
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } 
    catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
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
          <h2 className={style.title}>
              {step === 1 ? "약관 동의" : "회원가입"}
          </h2>

          {step === 1 ? (
            <>
              <p className={style.subtitle}>
                  서비스 약관에 동의해 주세요
              </p>
              <div className={style.checkboxGroup}>
                <div className={style.checkboxItem} style={{ marginBottom: "1.25rem" }}>
                  <input
                    type="checkbox"
                    id="all-agreements"
                    checked={allAgreements}
                    onChange={handleAllAgreementsChange}
                    className={style.checkboxInput}
                  />
                  <label htmlFor="all-agreements" className={style.textLabel}>
                    아래의 내용을 모두 확인하였으며 모두 동의합니다.
                  </label>
                </div>
                <div className={style.checkboxItemLast}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreements.terms}
                    onChange={() => handleAgreementChange('terms')}
                    className={style.checkboxInput}
                  />
                  <label htmlFor="terms" className={style.textLabel}>
                    이용약관 동의 (필수)
                  </label>
                </div>
                <div className={style.checkboxItemLast}>
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreements.privacy}
                    onChange={() => handleAgreementChange('privacy')}
                    className={style.checkboxInput}
                  />
                  <label htmlFor="privacy" className={style.textLabel}>
                    개인정보 수집 이용 동의 (필수)
                  </label>
                </div>
                <div className={style.checkboxItemLast}>
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={agreements.marketing}
                    onChange={() => handleAgreementChange('marketing')}
                    className={style.checkboxInput}
                  />
                  <label htmlFor="marketing" className={style.textLabel}>
                    소식 및 이벤트 안내 수신 동의 (선택)
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isNextEnabled}
                className={`${style.button} ${
                  isNextEnabled ? style.buttonEnabled : style.buttonDisabled
                }`}
              >
                다음으로
              </button>
            </>
          ) : (
            <>
              <p className={`${style.subtitle} ${style.subtitleStep2}`}>
                회원 정보를 입력해 주세요
              </p>
              <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                  <label htmlFor="email" className={style.label}>
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="이메일을 입력해 주세요"
                    value={form.email}
                    onChange={handleFormChange}
                    className={style.input}
                    required
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="password" className={style.label}>
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={form.password}
                    onChange={handleFormChange}
                    className={style.input}
                    required
                  />
                </div>
                <div className={style.formGroup}>
                  <label htmlFor="confirmPassword" className={style.label}>
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    value={form.confirmPassword}
                    onChange={handleFormChange}
                    className={style.input}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isSubmitEnabled}
                  className={`${style.button} ${
                    isSubmitEnabled ? style.buttonEnabled : style.buttonDisabled
                  }`}
                >
                  가입하기
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}