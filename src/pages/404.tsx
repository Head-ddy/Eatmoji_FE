import Head from "next/head";
import Link from "next/link";
import sharedStyle from "@/styles/shared.module.css";
import style from "./errorpage.module.css";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>페이지를 찾을 수 없어요 🕵️‍♀️</title>
      </Head>
      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <h1 className={style.title}>404 - 페이지를 찾을 수 없어요 🕵️‍♀️</h1>
        <p className={style.message}>
          요청하신 페이지가 존재하지 않거나,<br />
          이동되었을 수 있어요.
        </p>
        <Link href="/">
          <button className={style.button}>홈으로 돌아가기</button>
        </Link>
      </div>
    </>
  );
}
