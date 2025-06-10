/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTokenStore } from '@/store/tokenStore';

interface AuthWrapperProps {
  children: ReactNode;
}

const publicPaths = ['/', '/main', '/login', '/signup', '/auth-required']; // 보호하지 않는 경로들

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const accessToken = useTokenStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken && !publicPaths.includes(router.pathname)) {
        router.replace(`/auth-required?from=${router.pathname}`);
    }
  }, [accessToken, router.pathname]);

  if (!accessToken && !publicPaths.includes(router.pathname)) {
    return null; // 토큰 없으면 아무것도 렌더링하지 않음
  }

  return <>{children}</>;
}