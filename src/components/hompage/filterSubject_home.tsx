import Link from "next/link";

const nav = () =>{
    return(
        <>
            <div className="my-[5%] px-[2%] ">
                <div className="text-end text-blue-600">
                    <h3 className="text-5xl font-bold">คัดกรองรายวิชาทำได้ง่าย</h3>
                    <p className="text-2xl">ทำให้มีแผนการเรียนที่หลากหลาย เพื่อการเรียนที่ดี</p> 
                </div>
                <div className="flex">
                    <div className="flex z-10">
                        <img className="" width={300}  src="/showfilterSubject.png" alt="showfilterSubject" />
                        <img className="" width={300} src="/filterSubject.png" alt="filterSubject" />
                    </div>
                    <div>
                        <img className="" height={20} src="/Time Table.png" alt="Time Table" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default nav;