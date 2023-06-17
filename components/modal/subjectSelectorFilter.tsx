"use client"
export default function SubjectSelectorFilter(props:any){
    const {
        state,
        closeBtn = () => {}
    } = props;

    return (
        <div className={`fixed smooth-out flex justify-center items-end w-full h-full ${state.filter.popupNameToggle && "bg-black/20"} z-50 rounded-t-3xl pointer-events-none`}>
            <div className={`smooth-out overflow-hidden pointer-events-auto fixed rounded-t-3xl w-[96%] h-[62dvh] bg-white ${state.filter.popupNameToggle ? "bottom-0" : "-bottom-full"}`}>
            <div className="h-full grid grid-rows-[auto_1fr] relative">
                <section id="header" className="relative w-full pt-6 pb-2 px-6 flex justify-between border-b-2 border-slate-300/50">
                <div className="relative flex gap-6">
                    <div className="w-fit flex items-center">
                    <h1 className='font-bold'>เลือกรายวิชา</h1>
                    </div>
                </div>
                <div className="">
                    <div className="flex gap-4">
                    <span className='py-2 px-4 rounded-lg bg-slate-200/70 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer' onClick={()=>closeBtn()}>ถัดไป</span>
                    </div>
                </div>
                </section>
                <section id="subjects" className={`px-5 w-full h-full overflow-y-auto smooth`}>
                    <section id="type-ge-1">
                        <article className="pt-4 pb-2 border-b-2 border-slate-200">
                            <h1 className="font-bold">หมวดหมู่ที่ 1</h1>
                            <p className="text-sm">ชื่อหมวดหมู่วิชา</p>
                        </article>
                            <div className="border-b-2 border-slate-400">
                                <button className="w-full py-2 text-left">
                                    <p>0041001 - วิชาทดสอบ</p>
                                </button>
                            </div>
                    </section>
                </section>
            </div>
            </div>
        </div>
    )
}