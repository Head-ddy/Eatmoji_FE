import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  email: string | null;
  setEmail: (email: string) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      email: null,
      setEmail: (email) => set({ email }),
      clearUser: () => set({ email: null }),
    }),
    {
      name: "user-storage", // localStorage 키
    }
  )
);