import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';
import Nav from '../components/hompage/nav_home';
import Footer from '../components/hompage/footer_home';
import FilterSubjectt from '../components/hompage/filterSubject_home';


const HomePage = () => {
  return (
    <>
      <Nav/>
      {/* <div className="">
        <section>
          <div className='flex-col w-full h-full bg-blue-300 align-baseline'>
              <div className='flex pt-20 w-full justify-center'>
                <img className='' src="/Logo-Planriean.png" alt=""/>
                <div className='ml-20 text-[#FFFFFF] flex-col align-middle'>
                  <h1 className='text-7xl '>PLANRIEAN<br />วางแผน การเรียน</h1>
                  <h1 className='text-7xl border-b-4 border-[#FFFFFF] mt-2'>ให้ง่ายกว่าที่่เคย</h1>
                  <div className='text-center'>
                    <button className='bg-[#FFFFFF] text-black mt-5'>ลองใช้เลย ตอนนี้!</button>
                  </div>
                </div>
              </div>
              <div className='flex-col justify-center'>
                  <div className='flex-col w-full text-center'>
                    <h1 className="text-7xl text-[#FFFFFF]">บริการของเรา</h1>
                  </div>
                  <div className="flex-col ">
                      <h1 className="text-4xl text-[#FFFFFF]">การวางแผนที่สะดวกรวดเร็ว<br />รีวิวรายวิชาจากนักศึกษารายปี<br />เพิ่มความมั่นใจในรายวิชาที่ต้องการเรียน</h1>
                  </div>
                      
                  
              </div>
          </div>
        </section>

      </div> */}
      <FilterSubjectt/>
      <Footer/>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
export default HomePage;
