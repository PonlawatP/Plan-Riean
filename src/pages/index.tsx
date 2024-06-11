import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Planriean: จัดตารางเรียนง่ายๆ ไม่ต้องปวดหัวอีกต่อไป</title>
      </Head>
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
