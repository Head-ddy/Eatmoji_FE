import Link from 'next/link';
import { ReactNode } from 'react';
import style from './global-layout.module.css';
import { useRouter } from 'next/router';

export default function Layout({ children } : { children: ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div className={style.container}>
      <main className={style.main}>{children}</main>

      <nav className={style.nav}>
        <Link href="/todaymenu" className={`${style.link} ${pathname === '/search' ? style.active : ''}`}>오늘의 메뉴</Link>
        <Link href="/" className={`${style.link} ${pathname === '/' ? style.active : ''}`}>홈</Link>
        <Link href="/mypage" className={`${style.link} ${pathname === '/mypage' ? style.active : ''}`}>마이페이지</Link>
      </nav>
    </div>
  );
}
