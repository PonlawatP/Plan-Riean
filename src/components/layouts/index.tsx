import GoogleAnalytics from '@/GoogleAnalytics'
import { ThemeContext } from '@/providers'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import { useContext } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image'

const font = IBM_Plex_Sans_Thai({ 
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ['latin', 'thai']
})

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const {theme} = useContext(ThemeContext)
  return (
    <>
    <style jsx global>{`
        body {
          background: ${theme === 'day' ? "#E6EDF3" : "#2A3035"};
        }
    `}</style>

    <div className={"pr-layout h-[100dvh] grid grid-rows-[auto_1fr] "+font.className}>
      <section className="pr-topbar flex justify-center sm:justify-between items-center p-8 py-4">
        <button className='hidden sm:flex'><Image src="/assets/images/Planriean.png" alt="Planriean Logo" width={30} height={30}></Image></button>
        <article className='pr-planheader relative bg-white/80 border-1 border-white p-4 px-8 min-w-[25rem] w-[45%] rounded-full drop-shadow-xl'>
          <button className="header text-2xl font-medium flex gap-3 group">
            <h1>แผนเรียนใหม่</h1> <span className='text-pr-gray-1/80 group-hover:bg-pr-msu-1 group-hover:text-pr-msu-1-60 aspect-square h-7 rounded-md'><i className='bx bx-pencil mt-[3px]'></i></span>
          </button>
          <span className='text-md font-light text-pr-gray-1 flex gap-3'>
            <span className='flex gap-2'><p>เทอม</p><p>1</p></span>
            <span className='flex gap-2'><p>ปีการศึกษา</p><p>2565</p></span>
            <span className='plan-badge flex gap-2'>
              <span className='uni-badge text-sm font-bold px-2 rounded-full border-[2px] border-blue-900/30 bg-blue-300 text-blue-900/60'>IT</span>
              <span className='uni-badge text-sm font-bold px-2 rounded-full border-[2px] border-pr-msu-1-60/30 bg-pr-msu-1 text-pr-msu-1-60'>MSU</span>
            </span>
          </span>
          {/* <button className='absolute right-10 top-1/2 -mt-4 rounded-xl text-pr-msu-1-60 bg-pr-msu-1 border-2 border-pr-msu-1-60/30 p-1 px-2'>เลิอกแผนนี้</button> */}
        </article>
        <button className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-light hover:underline">
          <p className='hidden md:block'>Ponlawat</p>
          <Image src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-1/384989124_2274522622755838_4666111611377143413_n.jpg?stp=c34.0.445.444a_dst-jpg_p480x480&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wUdpZxwB05YAX8ciyiU&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfD3pTyHz5xsvdJK4L_DaKLOagZBY8VVOouRgtoNPp78gQ&oe=655AF106" alt="Planriean Logo" width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></Image>
        </button>
      </section>

      <div className={
        'pr-main grid relative md:grid-cols-[auto_1fr]'
        }>
          <section className="pr-sidebar hidden p-8 drop-shadow-xl min-h-[460px] md:w-[122px] lg:w-[260px] md:block">
            <div className="content flex flex-col relative h-full bg-white/60 border-[1px] rounded-3xl overflow-hidden">
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60 bg-pr-msu-1 text-pr-msu-1-60'>
                <i className='bx bx-home text-2xl drop-shadow-pr-shadow-text'/>
                <p className="drop-shadow-pr-shadow-text hidden lg:block">แผนเรียน</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-task text-2xl'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">แผนการเรียน</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-stats text-2xl'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">สถานะการเรียน</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-git-repo-forked text-2xl rotate-90'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">เส้นทางหลักสูตร</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-star text-2xl'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">รีวิว</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-map-alt text-2xl'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">แผนที่</p>
              </button>
              <button className='absolute bottom-0 px-4 h-14 w-full text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                <i className='group-hover:drop-shadow-pr-shadow-text bx bx-cog text-2xl'/>
                <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">ตั้งค่า</p>
              </button>
            </div>
          </section>
        {children}
      </div>
    </div>
    </>
  )
}
