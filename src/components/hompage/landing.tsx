
import Link from "next/link";

const landing = () => {
    return( <div className="">
    {/* <section> */}
      <div className='flex-col w-full h-9xl bg-blue-300 rounded-bl-b25 ml-5'>
          <div className='flex pt-20 w-full justify-center'>
            <img className='' src="/Logo-Planriean.png" alt=""/>
            <div className='ml-20 text-[#FFFFFF] flex-col align-middle'>
              <h1 className='text-7xl '>PLANRIEAN<br />วางแผน การเรียน</h1>
              <h1 className='text-7xl border-b-4 border-[#FFFFFF] mt-2'>ให้ง่ายกว่าที่่เคย</h1>
              <div className='text-center'>
                <button className='bg-[#FFFFFF] text-black mt-5'>ลองใช้เลย ตอนนี้!</button>
              </div>
            </div>
          </div>
          <div className='flex-col w-full mt-20'>
              <div className='flex-col text-center w-full'>
                <h1 className="text-7xl text-[#FFFFFF]">บริการของเรา</h1>
              </div>
              <div className="w-full text-left flex justify-center pt-10">
                  <h1 className="text-4xl text-[#FFFFFF]">การวางแผนที่สะดวกรวดเร็ว<br />รีวิวรายวิชาจากนักศึกษารายปี<br />เพิ่มความมั่นใจในรายวิชาที่ต้องการเรียน</h1>
              </div>
          </div>
      </div>
    {/* </section> */}

  </div>)
}

export default landing;