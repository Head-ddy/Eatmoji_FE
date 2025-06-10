import { create } from 'zustand';
import { useTokenStore } from './tokenStore';

interface AuthState {
  auth: boolean;
  setAuth: (auth: boolean, tokens?: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: false,
  setAuth: (auth, tokens) => {
    set({ auth });
    if (auth && tokens) {
      useTokenStore.getState().setTokens(tokens);
      console.log('로그인 상태:', auth);
    }
  },
  clearAuth: () => {
    useTokenStore.getState().clearTokens();
    set({ auth: false });
  },
}));