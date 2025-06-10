import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) =>
        set(() => ({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })),
      clearTokens: () =>
        set(() => ({
          accessToken: null,
          refreshToken: null,
        })),
    }),
    {
      name: 'token-storage', // 로컬스토리지에 저장될 키 이름
    }
  )
);