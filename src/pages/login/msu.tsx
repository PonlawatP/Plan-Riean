import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import RootLayout from "../layout";
import { useRouter } from "next/router";
import Link from "next/link";

function LoginPage(props:any) {
  const { data: session } = useSession();
  // console.log(session)
  const redirect = useRouter()
  if (session) {
    const fallbackUrl = redirect.query.fallbackUrl as string || '/';
    
    redirect.push(fallbackUrl);
  }

  return ( 
    <section className="bg-pr-bg min-h-screen flex items-center justify-center">
      {session ? <>
        <p>user email is: {session?.user?.email}</p>
      </> :
        <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
          <div className="px-8">
            <h2 className="font-bold text-2xl text-[#002D74]">เข้าใช้ด้วยระบบทะเบียน</h2>
            <h2 className="font-bold text-lg text-[#002D74]">มหาวิทยาลัยมหาสารคาม</h2>
            <form className="text-sm flex flex-col gap-4 mt-4">
              <input
                type="learner-id"
                className="p-2 rounded-xl border"
                placeholder="รหัสนิสิต / ชื่อผู้ใช้"
              />
              <input
                type="password"
                className="p-2 rounded-xl border w-full"
                placeholder="รหัสผ่าน"
              />
              <button
                className="bg-[#002D74] text-white rounded-xl py-2 hover:scale-105
              duration-300"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            <div className="mt-2 text-xs text-[#002D74] underline">
              <Link href={{pathname: "/forget-password", query: { fallbackUrl: redirect.query.fallbackUrl }}}>ลืมรหัสผ่าน</Link>
            </div>
            <div className="mt-6 text-gray-400 grid items-center grid-cols-1">
              <hr className="border-gray-400" />
            </div>

            <div className="mt-5 text-xs flex justify-between items-center">
              <p className="text-gray-400">ไม่ได้อยู่ที่มหาวิทยาลัยมหาสารคาม?</p>
              <Link href={{pathname: "/login", query: { fallbackUrl: redirect.query.fallbackUrl }}} className="text-[#002D74]">
                เข้าสู่ระบบปกติ
              </Link>
            </div>
          </div>
        </div> }
    </section>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
        {page}
    </RootLayout>
  )
}

export default LoginPage