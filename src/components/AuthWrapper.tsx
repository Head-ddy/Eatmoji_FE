/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
  children: ReactNode;
}

const publicPaths = ['/', '/main', '/login', '/signup', '/auth-required'];

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('token-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAccessToken(parsed?.state?.accessToken ?? null);
      }
    } catch (e) {
      console.error("로컬스토리지 파싱 오류:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !accessToken && !publicPaths.includes(router.pathname)) {
      router.replace(`/auth-required?from=${router.pathname}`);
      console.log("토큰 없음, 리다이렉트 수행");
    }
  }, [isLoading, accessToken, router.pathname]);

  if (isLoading || (!accessToken && !publicPaths.includes(router.pathname))) {
    return null; // 로딩 중이거나 인증이 안 된 경우 아무것도 렌더링하지 않음
  }

  return <>{children}</>;
}