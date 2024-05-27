import { ReactElement } from 'react';
import RootLayout from '../app/layout/homelayout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <nav className='flex justify-between p-5'>
        <div className='flex text-xs'>
          <svg width="38" height="51" viewBox="0 0 38 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1397_25906)">
          <path d="M13.3939 30.2554V30.5663H9.71997V24.5566H10.05V30.2554H13.3939Z" fill="#007AEB"/>
          <path d="M15.2443 30.2554H18.8303L16.5753 25.2508L14.1773 30.5663H13.8253L16.5753 24.453L19.3253 30.5663H15.2443V30.2554Z" fill="#007AEB"/>
          <path d="M20.5803 30.5663V24.5566H20.9102L24.4962 29.9964V24.5566H24.8262V30.5663H24.4962L20.9102 25.1161V30.5663H20.5803Z" fill="#007AEB"/>
          <path d="M12.4039 39.7258L13.8999 42.741H13.5369L11.997 39.6325C12.0116 39.6256 12.074 39.598 12.184 39.5496C12.3013 39.4944 12.3819 39.4564 12.4259 39.4357C12.4699 39.408 12.5433 39.3631 12.6459 39.301C12.7486 39.2388 12.8256 39.1801 12.8769 39.1248C12.9283 39.0627 12.9833 38.9936 13.0419 38.9176C13.1079 38.8347 13.1556 38.7449 13.1849 38.6482C13.2143 38.5446 13.2289 38.4341 13.2289 38.3166C13.2289 37.8814 13.0089 37.5602 12.5689 37.353C12.129 37.1458 11.5826 37.0422 10.93 37.0422H10.05V42.741H9.71997V36.7313H10.93C11.7953 36.7313 12.4479 36.8729 12.8879 37.1561C13.3353 37.4394 13.5589 37.8262 13.5589 38.3166C13.5589 38.6344 13.4453 38.9176 13.2179 39.1663C12.9906 39.408 12.7193 39.5945 12.4039 39.7258Z" fill="#007AEB"/>
          <path d="M15.3918 36.7313H15.7218V42.741H15.3918V36.7313Z" fill="#007AEB"/>
          <path d="M22.0768 42.1296C21.6734 42.6063 21.0134 42.8446 20.0968 42.8446C19.1801 42.8446 18.5238 42.5994 18.1278 42.1089C17.7318 41.6185 17.5338 40.8275 17.5338 39.7361C17.5338 38.6447 17.7318 37.8538 18.1278 37.3634C18.5238 36.8729 19.1801 36.6277 20.0968 36.6277C21.1601 36.6277 21.8824 36.9558 22.2638 37.612L19.5688 39.7361H19.0518L21.8348 37.5499C21.5121 37.1423 20.9328 36.9386 20.0968 36.9386C19.7301 36.9386 19.4221 36.9766 19.1728 37.0525C18.9234 37.1216 18.6924 37.2563 18.4798 37.4566C18.2744 37.65 18.1204 37.9367 18.0178 38.3166C17.9151 38.6896 17.8638 39.1628 17.8638 39.7361C17.8638 40.3095 17.9151 40.7861 18.0178 41.166C18.1204 41.539 18.2744 41.8257 18.4798 42.026C18.6924 42.2194 18.9234 42.3541 19.1728 42.4301C19.4221 42.4992 19.7301 42.5337 20.0968 42.5337C20.9328 42.5337 21.5121 42.33 21.8348 41.9224L22.0768 42.1296Z" fill="#007AEB"/>
          <path d="M24.4181 42.4301H28.0041L25.7491 37.4255L23.3511 42.741H22.9991L25.7491 36.6277L28.4991 42.741H24.4181V42.4301Z" fill="#007AEB"/>
          <path d="M29.754 42.741V36.7313H30.084L33.67 42.1711V36.7313H34V42.741H33.67L30.084 37.2908V42.741H29.754Z" fill="#007AEB"/>
          <path d="M4 16.3193H8.67497V43H4V16.3193Z" fill="#007AEB"/>
          <path d="M4 4.40361L4 7.24661e-07L21.5999 0V4.40361L4 4.40361Z" fill="#007AEB"/>
          <path d="M8.67497 20.7229V16.3193H21.5999V20.7229H8.67497Z" fill="#007AEB"/>
          <path d="M21.5999 0.00064057V4.40452C26.1774 4.46477 29.0248 7.5291 29.0248 10.3614C29.0248 13.1938 26.1774 16.2581 21.5999 16.3184V20.7223C28.2951 20.6598 33.6998 16.0451 33.6998 10.3614C33.6998 4.67783 28.2951 0.06305 21.5999 0.00064057Z" fill="#007AEB"/>
          </g>
          <defs>
          <filter id="filter0_d_1397_25906" x="0" y="0" width="38" height="51" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1397_25906"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1397_25906" result="shape"/>
          </filter>
          </defs>
          </svg>
          <div className='mt-2 px-1 text-blue-500 font-semibold'>
            <p>PlanRiean</p>
            <p>แผนการเรียน</p>
          </div>
        </div>
        <div>
          <Link className='rounded-full bg-blue-600 text-white py-0.5 px-2' href="/register">สมัครสมาชิก</Link>
          <Link className='rounded-full bg-white text-blue-600 py-0.5 px-2 m-2 border-2 border-sky-600' href="/login">เข้าสู่ระบบ</Link>
        </div>
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
