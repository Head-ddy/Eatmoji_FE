import { useTokenStore } from "@/store/tokenStore";
import { RecommendResponse } from "@/types/recommend";

const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export const recommendByEmoji = async (
  emoji: string,
  accessToken: string | null
): Promise<RecommendResponse> => {
  const url = accessToken
    ? `${BASE_URL}/api/recommend/emoji/login`
    : `${BASE_URL}/api/recommend/emoji`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ emoji }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error:", response.status, errorBody);
      throw new Error("추천 결과를 불러오지 못했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("네트워크 또는 API 호출 중 에러 발생:", error);
    throw error;
  }
};

export const PersonalizedRecommendation = async (): Promise<RecommendResponse> => {
  const response = await fetch(`${BASE_URL}/api/recommend/personalized`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${useTokenStore.getState().accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch personalized recommendation");
  }

  const data: RecommendResponse = await response.json();
  return data;
};