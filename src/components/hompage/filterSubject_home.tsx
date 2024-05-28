import Link from "next/link";

const nav = () =>{
    return(
        <>
            <div className="my-[10%]">
                <div className="text-end text-blue-600 mx-5">
                    <h3 className="max-md:text-2xl text-5xl font-bold">คัดกรองรายวิชาทำได้ง่าย</h3>
                    <p className="max-md:text-xs lg:text-2xl">ทำให้มีแผนการเรียนที่หลากหลาย เพื่อการเรียนที่ดี</p> 
                </div>
                <div className="flex justify-center">
                    <div className="flex z-10">
                        <img className="border max-sm:hidden shadow-lg rounded-md mx-5" width={300}  src="/showfilterSubject.png" alt="showfilterSubject" />
                        <img className="border shadow-xl rounded-md mx-5 p-3 backdrop-blur-md bg-white/30" width={300} src="/filterSubject.png" alt="filterSubject" />
                    </div>
                    <div className="flex items-end max-[769px]:hidden">
                        <img className="" height={20} src="/Time Table.png" alt="Time Table" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default nav;