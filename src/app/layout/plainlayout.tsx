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

export default function PlainPageLayout({ children }: { children: React.ReactNode }) {
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
        body {
          touch-action: none;
        }
      `}</style>

      <div className={`grid grid-rows-[auto_minmax(0,1fr)] h-[100dvh] ${font.className}`}>
        <section className={`pr-topbar flex justify-between items-center p-6 sm:p-8 py-4 h-28 smooth-opacity`}>
          <div className="flex">
            <Image src="/assets/images/logo/Planriean.png" alt="Planriean Logo" width={30} height={30}></Image>
          </div>
          {hasSession ? (
            <Menu as="div" className="">
              <div>
                <Menu.Button className="pr-account flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline">
                  <div className="text-right hidden md:block mt-2">
                    <p className="">{session?.user?.name || 'User'}</p>
                    {/* <p className='font-light text-sm'>ทำอะไรได้มากกว่า</p> */}
                  </div>
                  <img
                    src={session?.user?.image as string}
                    onError={(e: any) => {
                      e.target.src = '/assets/images/prof.jpg';
                    }}
                    alt={`${session?.user?.name || 'User'}'s ${session?.user?.name || 'Profile'}`}
                    width={50}
                    height={50}
                    className="rounded-full aspect-square object-cover border-2 border-white/30"
                  ></img>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute overflow-hidden right-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account"
                        className={
                          'profile-badge-li block cursor-pointer text-sm py-2 pt-3 w-full font-medium text-center text-pr-text-menu hover:bg-pr-msu-1'
                        }
                      >
                        {session?.user?.name || 'User'}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/plan"
                        className={
                          'profile-badge-li block cursor-pointer text-sm py-2 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4'
                        }
                      >
                        แผนการเรียนของคุณ
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account/setting"
                        className={
                          'profile-badge-li block cursor-pointer text-sm py-2 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4'
                        }
                      >
                        จัดการบัญชี
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => signOut()}
                        className={
                          'profile-badge-li block cursor-pointer text-sm py-2 pb-3 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4'
                        }
                      >
                        ออกจากระบบ
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : null}
        </section>

        <div className={`pr-main relative`}>{children}</div>
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
