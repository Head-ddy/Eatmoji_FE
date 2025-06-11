import { useTokenStore } from "@/store/tokenStore";
import { HistoryItem } from "@/types/history";

const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export async function fetchHistory(page: number, pageSize: number): Promise<HistoryItem[]> {
  const res = await fetch(`${BASE_URL}/history?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${useTokenStore.getState().accessToken}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || "추천 기록을 불러오는데 실패했습니다.";
    throw new Error(message);
  }

  return res.json();
}
