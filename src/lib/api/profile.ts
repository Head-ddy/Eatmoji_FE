import { useTokenStore } from "@/store/tokenStore";
import { UserProfileData } from "@/types/profile";

const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export async function updateProfileRequest(data: {
  category: string[];
  flavor: string[];
  disease: string[];
  allergy: string[];
}): Promise<UserProfileData> {
const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let message = "프로필 업데이트에 실패했습니다.";

    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch (e) {
      console.error("에러 발생:", e);
      const errorText = await res.text();
      console.warn("JSON 파싱 실패, 응답 텍스트:", errorText);
      message = errorText || message;
    }

    throw new Error(message);
  }

  return res.json();
}

export async function getProfile(): Promise<UserProfileData> {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useTokenStore.getState().accessToken}`,
    },
  });

  if (!res.ok) {
    let message = "프로필 불러오기에 실패했습니다.";

    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch (e) {
      const errorText = await res.text();
      console.error("응답 파싱 실패:", e, "응답 텍스트:", errorText);
      message = errorText || message;
    }

    throw new Error(message);
  }

  return res.json(); // 👈 UserProfileData 반환
}