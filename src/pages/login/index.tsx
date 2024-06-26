import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
// import { useRouter } from "next/navigation";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Player } from '@lottiefiles/react-lottie-player';
import AuthPageLayout from '@/app/layout/authlayout';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

function LoginPage(props: any) {
  // console.log(session)
  const animationURL = '/assets/lotties/loading.json';
  const { data: session, status: session_status } = useSession();
  const [clicked, setClicked] = useState(false);
  const redirect = useRouter();

  useEffect(() => {
    const { pathname, query } = redirect;
    if (Object.keys(query).length > 0) {
      // Construct the new URL without the query parameters
      const newUrl = pathname;

      if (query.error != null) {
        toast.error(query.error);
      }

      // Use the router's replace method to update the URL without causing a page reload
      redirect.replace(newUrl, undefined, { shallow: true });
    }
  }, [redirect]);

  if (session_status == 'authenticated') {
    redirect.push({ pathname: '/plan' });
  }

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ : Planriean</title>
      </Head>
      <section className="relative bg-gradient-to-t from-pr-blue/90 to-pr-blue/80 min-h-[100dvh] flex items-center justify-center z-10">
        {/* loading overlay */}
        <div
          className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${
            session_status != 'loading' && !clicked ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <div className="box text-pr-blue text-center">
            <Player src={animationURL} autoplay loop speed={1} style={{ height: 100 }} />
            Loading
          </div>
        </div>

        <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
          <div className="px-8">
            <h2 className="font-bold text-2xl text-pr-blue-dark">เข้าสู่ระบบ</h2>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                if (clicked) return;

                setClicked(() => true);

                signIn('planriean', {
                  username: e.target[0].value,
                  password: e.target[1].value,
                });
              }}
              className="text-sm flex flex-col gap-4 mt-4"
            >
              <input
                type="text"
                id="username"
                className="smooth-all p-2 rounded-xl border"
                placeholder="Email / ชื่อผู้ใช้"
              />
              <input
                id="passwd"
                type="password"
                className="smooth-all p-2 rounded-xl border w-full"
                placeholder="รหัสผ่าน"
              />
              <button
                className="smooth-all bg-pr-blue text-white rounded-xl py-2 hover:scale-105
                duration-300"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            {/* TODO: forget password feature soon */}
            {/* <div className="mt-2 text-xs text-pr-blue-dark underline">
              <Link href={{ pathname: '/forget-password', query: { fallbackUrl: redirect.query.fallbackUrl } }}>
                ลืมรหัสผ่าน
              </Link>
            </div> */}
            <div className="mt-6 text-gray-400 grid items-center grid-cols-3">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">หรือ</p>
              <hr className="border-gray-400" />
            </div>
            <button
              onClick={() => {
                setClicked(() => true);
                if (clicked) return;

                signIn('google');
              }}
              className="smooth-all bg-white px-2 py-2 mt-5 border w-full rounded-xl 
              flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            >
              <Image src="/assets/images/logo/google-logo.png" width={30} height={30} alt="Google Logo" />
              <span className="px-2">เข้าสู่ระบบด้วย Google</span>
            </button>
            {/* <Link
              href={{ pathname: '/login/msu', query: { fallbackUrl: redirect.query.fallbackUrl } }}
              className="smooth-all bg-white px-2 py-2 mt-5 border w-full rounded-xl 
                flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            >
              <Image src="/assets/images/university/msu.png" width={30} height={30} alt="Google Logo" />
              <span className="px-2">เข้าสู่ระบบด้วยระบบทะเบียน มมส</span>
            </Link> */}

            <div className="mt-5 text-xs flex justify-between items-center">
              <p className="text-gray-400">คุณยังไม่มีบัญชีใช่หรือไม่?</p>
              <Link
                href={{ pathname: '/register', query: { fallbackUrl: redirect.query.fallbackUrl } }}
                className="text-[#002D74]"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="logo-rainslide" />
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthPageLayout>{page}</AuthPageLayout>;
};

export default LoginPage;
