/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import sharedStyle from "@/styles/shared.module.css";
import style from "./auth-required.module.css";

export default function AuthRequiredPage() {
  const router = useRouter();
  const from = router.query.from as string;

  return (
    <div className={sharedStyle.sharedContainer} style={{ textAlign: "center" }}>
      <img className={style.logo} src="/favicon_logo.png" alt="Logo" />
      <h2>이 페이지는 로그인한 사용자만 접근할 수 있습니다.</h2>
      <button
        onClick={() => router.push("/login?redirect=" + from)}
        className={style.loginButton}
      >
        로그인하러 가기
      </button>
    </div>
  );
}