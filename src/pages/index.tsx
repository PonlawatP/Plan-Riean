import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Nav from '../components/hompage/nav_home';
import Footer from '../components/hompage/footer_home';
import FilterSubjectt from '../components/hompage/filterSubject_home';
import SumaryData from '../components/hompage/summaryData_home';
import SearchSubject from '../components/hompage/searchSubject_home';
import HelpAboutYou from '../components/hompage/helpAboutYou';
import Landing from '@/components/hompage/landing';


const HomePage = () => {
  return (
    <>
      <Nav/>
      <Landing/>
      <HelpAboutYou/>
      <SearchSubject/>
      <FilterSubjectt/>
      <SumaryData/>
      <Footer/>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
