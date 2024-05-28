import Link from "next/link";

const nav = () =>{
    return(
        <>
            <div className="my-[10%] p-3">
                <div className="text-start text-blue-600 mx-5">
                    <h3 className="max-md:text-2xl text-5xl font-bold">ค้นหารายวิชาได้ทันที</h3>
                    <p className="max-md:text-xs lg:text-2xl">ไม่ว่าจะเป็น วิชาเอก หรือ วิชาศึกษาทั่วไป ก็สามารถจัดตารางกับเราได้</p> 
                </div>
                <div className="flex my-2 justify-around">
                    <div className="">
                        <img className="" width={300}  src="/showfilterSubject.png" alt="showfilterSubject" />
                    </div>
                    <div className="flex items-end max-[426px]:hidden">
                        <img className="" height={10} src="/Time Table.png" alt="Time Table" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default nav;