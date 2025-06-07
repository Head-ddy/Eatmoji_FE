/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { fetchHistory } from "@/lib/fetch-history";
import { HistoryItem } from "@/types/history";

const PAGE_SIZE = 10;

export default function History() {
  const router = useRouter();

  const getKey = (pageIndex: number, previousPageData: HistoryItem[] | null) => {
    if (previousPageData && previousPageData.length === 0) return null; // 더 이상 데이터 없음
    return `${pageIndex + 1}`; // 키는 페이지 번호
  };

  const {
    data,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<HistoryItem[]>(
    getKey,
    async (page) => fetchHistory({ page: Number(page), pageSize: PAGE_SIZE }),
    { revalidateFirstPage: false }
  );

  const items = data ? data.flat() : [];
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (id: string) => {
    router.push(`/mypage/history/recommended/${id}`);
  };

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isValidating) {
        setSize(size + 1);
      }
    },
    [size, isValidating, setSize]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [onIntersect]);

  return (
    <>
      <Head>
        <title>Eatmoji😆</title>
        <meta property="og:title" content="Eatmoji" />
        <meta property="og:description" content="이모지 기반 감성 메뉴 추천 서비스" />
        <meta property="og:image" content="/favicon_logo.png" />
      </Head>

      <div className={`${sharedStyle.sharedContainer} ${style.container}`}>
        <div className={style.header}>추천 기록</div>

        <div className={style.historyList}>
          {items.map((item) => (
            <div
              key={item.id}
              className={style.historyCard}
              onClick={() => handleClick(item.id)}
            >
              <div className={style.emoji}>{item.emotion}</div>
              <div className={style.food}>{item.recommendation.food}</div>
              <div className={style.date}>
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
          <div ref={loaderRef} className={style.loader}>
            {isValidating && "불러오는 중..."}
          </div>
        </div>
      </div>
    </>
  );
}
