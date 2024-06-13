import { ReactElement, use, useEffect, useRef, useState } from 'react';
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
import Image from 'next/image';

const HomePage = () => {
  const [anim, setAnim] = useState(0);
  useEffect(() => {
    if (anim < 3) {
      setTimeout(
        () => {
          setAnim((prev: number) => prev + 1);
        },
        anim == 0 ? 50 : (anim + 1) * 200,
      );
    }
  }, [anim]);

  return (
    <section className="h-full overflow-hidden lg:grid grid-cols-[auto_40%]">
      <Head>
        <title>Planriean: จัดตารางเรียนง่ายๆ ไม่ต้องปวดหัวอีกต่อไป</title>
      </Head>
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="relative w-full flex flex-col items-center justify-center drop-shadow-xl max-lg:mb-10">
          <div
            className={`flex flex-col items-center justify-center transition-all duration-[1500ms] ${
              anim == 0 ? 'translate-y-4 scale-95 opacity-0 blur-md' : ''
            }`}
          >
            <h1 className="w-fit text-3xl font-semibold leading-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
              ให้การจัดตารางเรียน
            </h1>
            <h1 className=" w-fit text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 py-1 mb-4">
              ง่ายกว่าที่เคยด้วย
            </h1>
          </div>
          <h1
            style={{ WebkitTextStroke: '1px rgba(75,145,255,1)' }}
            className={`text-[3.5rem] leading-[3rem] w-fit font-bold text-white py-1 mb-6 transition-all duration-[1500ms] ${
              anim < 2 ? 'translate-y-4 opacity-0 blur-md' : ''
            }`}
          >
            PLANRIEAN
          </h1>

          {/* <h1
            className=" w-fit text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 py-1 mb-6"
          >
            <span className="text-[5rem] leading-[5rem]" style={{ WebkitTextStroke: '2px rgba(75,145,255,1)' }}>
              ง่าย
            </span>{' '}
            กว่าที่เคย
          </h1> */}

          <Link
            href={{
              pathname: '/plan',
            }}
            className={`mt-8 transition-all duration-[1500ms] delay-150 ${
              anim < 2 ? 'translate-y-4 opacity-0 blur-md' : ''
            }`}
          >
            <button
              className={`smooth-all text-pr-blue h-10 px-4 py-1 rounded-lg bg-white border-b-[3px] border-slate-800/50 hover:bg-pr-blue hover:border-[2px] hover:border-white hover:text-white active:border-0 active:bg-pr-blue-dark active:text-white/80`}
            >
              เริ่มวางแผนกันเลย วันนี้!
            </button>
          </Link>
          <p
            className={`text-white/40 text-sm mt-4 transition-all duration-[1500ms] ${
              anim < 3 ? 'translate-y-4 opacity-0 blur-md' : ''
            }`}
          >
            แพลนเรียน 1.0.0 Alpha
          </p>
        </div>
        <span className="absolute lg:hidden w-full h-10 bg-white -bottom-1 rounded-t-full"></span>
      </div>
      <div
        className={`max-md:-translate-y-32 max-lg:-translate-y-40 max-lg:mt-10 lg:relative lg:w-full lg:h-full overflow-clip transition-all duration-[1500ms] delay-200 ${
          anim < 1 ? 'lg:blur-md' : ''
        }`}
      >
        <Image
          className={`mx-auto rounded-lg lg:rounded-r-none md:rounded-xl shadow-md lg:shadow-xl border-white border lg:border-r-0 w-[80vw] h-auto lg:w-auto lg:h-1/2 lg:object-cover lg:object-left lg:absolute transition-all duration-[1500ms] delay-150 ${
            anim < 1 ? 'lg:translate-y-[60%] lg:opacity-0' : 'lg:translate-y-[50%]'
          }`}
          src={'/assets/images/timetable.png'}
          width={2822}
          height={1082}
          alt={'mockup timetable'}
        ></Image>
      </div>
      {/* <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 2, y: 0 }} transition={{ duration: 1 }}>
        <Nav />
        <Landing />
      </motion.section>
      <HelpAboutYou />
      <SearchSubject />
      <FilterSubjectt />
      <SumaryData />
      <Footer /> */}
    </section>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
