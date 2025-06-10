import Layout from "@/components/global-layout";
import AuthWrapper from "@/components/AuthWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const publicPaths = ["/main", "/login", "/signup", "/auth-required"];

  // 현재 경로가 공개 경로인지 확인
  const isPublicPage = publicPaths.some((path) =>
    router.pathname === path || router.pathname.startsWith(path + "/")
  );

  const content = isPublicPage ? (
    <Component {...pageProps} />
  ) : (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  );

  return <Layout>{content}</Layout>;
}