import Link from 'next/link';
import { useScroll, useTransform, useViewportScroll, motion } from 'framer-motion';

const FilterLand = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);
  const opacity_2 = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 0]);

  return (
    <>
      <motion.div className="my-[10%]" style={{ scale, opacity: opacity_2 }}>
        <div className="text-end text-blue-600 mx-5">
          <h3 className="max-md:text-2xl text-5xl font-bold">คัดกรองรายวิชาทำได้ง่าย</h3>
          <p className="max-md:text-xs lg:text-2xl">ทำให้มีแผนการเรียนที่หลากหลาย เพื่อการเรียนที่ดี</p>
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex z-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img
              className="border max-sm:hidden shadow-lg rounded-md mx-5"
              width={300}
              src="/showfilterSubject.png"
              alt="showfilterSubject"
            />
            <img
              className="border shadow-xl rounded-md mx-5 p-3 backdrop-blur-md bg-white/30"
              width={300}
              src="/filterSubject.png"
              alt="filterSubject"
            />
          </div>
          <div className="flex items-end max-[769px]:hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img className="" height={20} src="/Time Table.png" alt="Time Table" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterLand;
