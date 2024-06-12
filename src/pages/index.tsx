import { ReactElement, use, useRef } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Nav from '../components/hompage/nav_home';
import Footer from '../components/hompage/footer_home';
import FilterSubjectt from '../components/hompage/filterSubject_home';
import SumaryData from '../components/hompage/summaryData_home';
import SearchSubject from '../components/hompage/searchSubject_home';
import HelpAboutYou from '../components/hompage/helpAboutYou';
import Landing from '@/components/hompage/landing';
import { motion, useScroll } from 'framer-motion';

import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Planriean: จัดตารางเรียนง่ายๆ ไม่ต้องปวดหัวอีกต่อไป</title>
      </Head>
      {/* <div className="min-h-[100dvh] flex justify-center items-center">
        <p>hi สวัสดีครับ</p>
        <Link href="/plan">จัดตารางเรียน</Link>
      </div> */}
      <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 2, y: 0 }} transition={{ duration: 1 }}>
        <Nav />
        <Landing />
      </motion.section>
      <HelpAboutYou />
      <SearchSubject />
      <FilterSubjectt />
      <SumaryData />
      <Footer />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
