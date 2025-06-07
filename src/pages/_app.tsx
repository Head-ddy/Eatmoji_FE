import Layout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noLayoutPaths = [""];

  const isNoLayout = noLayoutPaths.includes(router.pathname);

  if (isNoLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
