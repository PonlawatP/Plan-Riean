import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Nav from '../components/hompage/nav_home';
import Footer from '../components/hompage/footer_home';
import FilterSubjectt from '../components/hompage/filterSubject_home';
import Landing from '@/components/hompage/landing';

const HomePage = () => {
  return (
    <>
      <Nav/>
      <Landing/>
      <FilterSubjectt/>
      <Footer/>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
