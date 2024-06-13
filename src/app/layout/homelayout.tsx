import { ThemeContext } from '@/app/providers';
import { IBM_Plex_Sans_Thai, K2D } from 'next/font/google';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';

export const font = IBM_Plex_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});
export const k2dfont = K2D({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();

  const isSessionLoaded = session != undefined;
  const hasSession = session != null;

  return (
    <>
      <style jsx global>{`
        :root {
          --toastify-font-family: ${font.style.fontFamily};
        }
      `}</style>

      <div
        className={`grid grid-rows-[auto_minmax(0,1fr)] h-[100dvh] bg-gradient-to-b from-pr-blue from-40% to-pr-blue/80 ${font.className}`}
      >
        <section
          className={`pr-topbar flex justify-between items-center p-6 sm:p-8 py-4 h-18 sm:h-28 smooth-opacity sticky top-0 border-b border-blue-50/15`}
        >
          <div className="flex">
            <Image src="/assets/images/logo/Planriean-White.png" alt="Planriean Logo" width={30} height={30}></Image>
            {/* <div className="smooth absolute w-full top-3 left-3 z-50 ">
              <p className="text-black/40">เวอร์ชั่นทดสอบ 1.0.0</p>
              <a
                className="smooth text-black/60 font-bold hover:pl-2 hover:text-black/80"
                href="https://forms.gle/GyCybmxCu1kqDNZu7"
              >
                แจ้งปัญหา / เสนอไอเดีย
              </a>
            </div> */}
          </div>
          <Link
            href={{
              pathname: '/plan',
            }}
            className="pr-account flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline"
          >
            <div className="text-right block mt-2">
              <button
                className={`smooth-all text-pr-blue h-10 px-4 py-1 rounded-lg bg-white border-b-[3px] border-slate-800/50 hover:bg-pr-blue hover:border-[2px] hover:border-white hover:text-white active:border-0 active:bg-pr-blue-dark active:text-white/80`}
              >
                วางแผนกัน !
              </button>
            </div>
          </Link>
        </section>

        <div className={`pr-main h-full relative`}>{children}</div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
