import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <nav>
        <img src="/icon-512.png" alt="" />
      </nav>
      <div className="min-h-[100dvh] flex justify-center items-center">
        <p>hi สวัสดีครับ</p>
        <Link href="/plan">จัดตารางเรียน</Link>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
