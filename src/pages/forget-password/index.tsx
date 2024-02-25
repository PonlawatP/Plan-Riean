import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";
import AuthPageLayout from "@/app/layout/authlayout";
import { runCheckUserStatus } from "@/app/utils/auth";
import Head from "next/head";

function LoginPage(props:any) {
  // console.log(session)
  const animationURL = "/assets/lotties/loading.json";
  const { data:session, status:session_status} = useSession();
  const redirect = useRouter()

  return ( 
    <>
      <Head>
        <title>ลืมรหัสผ่าน : Planriean</title>
      </Head>
      <section className="relative bg-gradient-to-t from-pr-blue/80 to-pr-bg min-h-screen flex items-center justify-center z-10">
          {/* loading overlay */}
          <div className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${session_status != 'loading' ? "opacity-0 pointer-events-none" : ""}`}>
            <div className="box text-pr-blue text-center">
              <Player
                src={animationURL}
                autoplay
                loop
                speed={1}
                style={{height: 100}}
              />
              Loading
            </div>
          </div>

          <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
            <div className="px-8">
              <h2 className="font-bold text-2xl text-pr-blue-dark">ลืมรหัสผ่าน</h2>
              <form className="text-sm flex flex-col gap-4 mt-4">
                <input
                  type="email"
                  className="smooth-all p-2 rounded-xl border"
                  placeholder="Email / ชื่อผู้ใช้"
                />
                <button
                  className="smooth-all bg-pr-blue text-white rounded-xl py-2 hover:scale-105
                duration-300"
                >
                  ส่งรหัสยืนยัน
                </button>
              </form>
              <div className="mt-5 text-xs flex justify-between items-center">
                <p className="text-gray-400">ไม่ได้ลืมรหัสผ่าน?</p>
                <Link href={{pathname: "/login", query: { fallbackUrl: redirect.query.fallbackUrl }}} className="text-[#002D74]">
                  กลับไปเข้าสู่ระบบ
                </Link>
              </div>
            </div>
          </div>
      </section>
      <div className="logo-rainslide"/>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthPageLayout>
        {page}
    </AuthPageLayout>
  )
}

export default LoginPage