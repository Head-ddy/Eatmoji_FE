import Head from "next/head";
import Link from "next/link";
import sharedStyle from "@/styles/shared.module.css";
import style from "./recipe-error.module.css";

export default function RecipeErrorPage() {
  return (
    <>
      <Head>
        <title>레시피를 찾을 수 없어요 😢</title>
      </Head>
      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <h1 className={style.title}>레시피를 찾을 수 없어요 😢</h1>
        <p className={style.message}>
          정확한 레시피는 찾지 못했지만,<br />
          여러분이 한 번 만들어보는 건 어떨까요?
        </p>
        <Link href="/">
          <button className={style.button}>처음으로 돌아가기</button>
        </Link>
      </div>
    </>
  );
}
