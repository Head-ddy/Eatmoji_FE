import { useTokenStore } from "@/store/tokenStore";

const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export async function toggleLikeHistoryItem(id: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/history/${id}/like`, {
    method: 'PATCH',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${useTokenStore.getState().accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to update like status for history item ${id}`);
  }

  const data = await response.json();

  if (data.likeStatus === true) return true;
  if (data.likeStatus === false) return false;

  throw new Error('Unexpected response from server');
}