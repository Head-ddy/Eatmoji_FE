import historyData from "@/mock/history.json";
import { HistoryItem } from "@/types/history";

export async function fetchHistory({
  page = 1,
  pageSize = 10
}: {
  page?: number;
  pageSize?: number;
}): Promise<HistoryItem[]> {
  // 일반적인 API 요청 딜레이 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 300));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return historyData.slice(start, end);
}
