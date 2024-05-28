
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from 'react';
import { ReactElement, use, useRef } from 'react';
// import ScrollReveal from 'scrollreveal';
import { useScroll , useTransform,useViewportScroll} from "framer-motion";

const landing = () => {
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.8]);
    return( 
        
    
    <div className="">

      <div className='flex-col w-full h-9xl  rounded-bl-b25 ml-5] bg-gradient-to-br from-[#007AEB] to-[#503bd9] text-[#5E75FF] p-6 rounded '>
            {/* Landing */}
            <section>
                <motion.div 
                    className='flex pt-60 w-full justify-center max-sm:flex-col max-sm:pt-24 max-lg:flex-col max-lg:pt-20 max-xl:pt-36'
                  
                    style={{
                        scale
                    }}
                    >
                    <div className="max-sm:ww-full flex justify-center mb-10 max-sm:hidden">
                        <img src="/Logo-Planriean.png" alt="" />
                    </div>
                    <div className="max-sm:ww-full justify-center mb-10 hidden max-sm:flex">
                        <img src="/Logo-Planriean.png" alt="" width={100}/>
                    </div>
            
                    <div className='ml-20 text-[#FFFFFF] flex-col align-middle max-sm:ml-0 max-lg:text-center max-lg:ml-0'>
                        <h1 className='text-7xl max-sm:text-4xl animate-bounce'>PLANRIEAN</h1>
                        <h1 className='text-7xl max-sm:text-4xl '>วางแผน การเรียน</h1>
                        <div className="w-fit max-sm:w-full flex justify-center max-lg:w-full ">
                            <h1 className='text-7xl border-b-4 border-[#FFFFFF] mt-2  max-sm:text-4xl w-fit '>ให้ง่ายกว่าที่่เคย</h1>
                        </div>
                        <div className='text-center w-full mt-6'>
                            <button className='bg-[#FFFFFF] mt-5 w-full h-16 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 rounded-3xl  text-blue-500 max-lg:w-3/4'>ลองใช้เลย ตอนนี้!</button>
                        </div>
                    </div>
                </motion.div>
            </section>
            {/* Service */}
            <section>
                <motion.div 
                    className='flex-col w-full mt-60 max-sm:mt-24 max-lg:mt-30'
                    style={{scale}}
                    >
                    <div className='flex-col text-center w-full'>
                        <h1 className="text-7xl text-[#FFFFFF] max-sm:text-3xl">บริการของเรา</h1>
                    </div>
                    <div className="w-full text-left flex justify-center pt-10 max-sm:pt-6">
                            <ul className="list-disc list-inside text-[#FFFFFF]">
                                <li className="text-4xl max-sm:text-xl">การวางแผนที่สะดวกรวดเร็ว</li>
                                <li className="text-4xl  max-sm:text-xl">รีวิวรายวิชาจากนักศึกษารายปี</li>
                                <li className="text-4xl  max-sm:text-xl">เพิ่มความมั่นใจในรายวิชาที่ต้องการเรียน</li>
                            </ul>
                            {/* transform translate-x-40 */}
                        {/* <h1 className="text-4xl text-[#FFFFFF]">การวางแผนที่สะดวกรวดเร็ว<br />รีวิวรายวิชาจากนักศึกษารายปี<br />เพิ่มความมั่นใจในรายวิชาที่ต้องการเรียน</h1> */}
                        <div className='absolute right-0 transform translate-x-40 max-xl:hidden'>
                                <svg width="503" height="614" viewBox="0 0 803 814" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M606.688 241.664C653.241 288.217 682.286 349.222 688.6 413.706C694.913 478.191 678.08 541.923 641.129 593.439C604.178 644.955 549.534 680.874 487.025 694.736C424.515 708.597 358.244 699.492 300.13 669.057C242.017 638.622 195.875 588.855 170.004 528.707C144.134 468.56 140.232 401.979 159.001 340.941C177.77 279.903 217.978 228.413 272.393 195.733C326.809 163.053 391.859 151.327 455.845 162.666L418.598 429.755L606.688 241.664Z" fill="#00417D"/>
                                    <path d="M571.696 195.515C618.249 242.068 647.294 303.073 653.607 367.557C659.921 432.042 643.088 495.773 606.137 547.289C569.186 598.805 514.542 634.725 452.032 648.586C389.523 662.448 323.252 653.342 265.138 622.907C207.025 592.472 160.883 542.705 135.012 482.558C109.142 422.41 105.24 355.83 124.009 294.791C142.778 233.753 182.986 182.264 237.401 149.584C291.816 116.904 356.867 105.178 420.853 116.516L383.605 383.605L571.696 195.515Z" fill="white"/>
                                    <path d="M571.696 195.515C606.267 230.086 631.402 272.858 644.538 319.471C657.673 366.083 658.34 414.869 646.47 460.856C634.6 506.842 610.618 548.384 576.968 581.247C543.318 614.111 501.204 637.12 454.919 647.929L383.605 383.605L571.696 195.515Z" fill="#FFC736"/>
                                </svg>
                            </div>
                        
                            
                    </div>
                    <div className="w-full flex justify-center relative top-48 max-sm:top-10 max-xl:top-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
                            <img src="/Group 192.png" alt="" />
                        </div>
                </motion.div>
            </section>
         
        </div>

    </div>)
}

export default landing;