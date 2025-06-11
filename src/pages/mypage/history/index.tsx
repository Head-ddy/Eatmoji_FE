/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import sharedStyle from "@/styles/shared.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetchHistory } from "@/lib/api/history";
import { HistoryItem } from "@/types/history";

const PAGE_SIZE = 10;

export default function History() {
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);

  const getKey = (pageIndex: number, previousPageData: HistoryItem[] | null) => {
    if (previousPageData && previousPageData.length === 0) return null; // 더 이상 데이터 없음
    return `history?page=${pageIndex + 1}&pageSize=${PAGE_SIZE}`; // 키는 페이지 번호
  };

  const {
    data,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<HistoryItem[]>(
    getKey,
    (key) => {
      const urlParams = new URLSearchParams(key.split("?")[1]);
      const page = parseInt(urlParams.get("page") || "1");
      const pageSize = parseInt(urlParams.get("pageSize") || `${PAGE_SIZE}`);
      return fetchHistory(page, pageSize);
    },
    { revalidateFirstPage: false, persistSize: true }
  );

  const flatItems = data ? data.flat() : [];
  const uniqueItems = Array.from(new Map(flatItems.map((item) => [item.id, item])).values());

  useEffect(() => {
    if (!isValidating && data && data.length >= 2) {
      const lastPage = data[data.length - 1];
      const previousItems = data.slice(0, -1).flat();
      const isAllDuplicated = lastPage.every((item) =>
        previousItems.some((prev) => prev.id === item.id)
      );
      if (isAllDuplicated) {
        console.log("중복 페이지로 감지되어 더 이상 로딩하지 않음");
        setHasMore(false); // 🔹 더 이상 불러오지 않도록 설정
      }
    }
  }, [data, isValidating]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (item: HistoryItem) => {
    sessionStorage.setItem("selectedHistoryItem", JSON.stringify(item));
    router.push(`/mypage/history/recommended/${item.id}`);
  };

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isValidating && hasMore) {
        setSize(size + 1);
      }
    },
    [size, isValidating, hasMore, setSize]
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
          {uniqueItems.map((item) => (
            <div
              key={item.id}
              className={style.historyCard}
              onClick={() => handleClick(item)}
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
