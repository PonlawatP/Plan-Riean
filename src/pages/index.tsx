import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Nav from '../components/hompage/nav_home';


const HomePage = () => {
  return (
    <>
       <Nav/>
      <div className="">
        <div className='w-full h-xl bg-Rose'>

        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
