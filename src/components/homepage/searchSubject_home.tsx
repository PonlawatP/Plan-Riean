import Link from 'next/link';
import { useScroll, useTransform, useViewportScroll, motion } from 'framer-motion';

const SearchSubjectLand = () => {
  const { scrollYProgress } = useViewportScroll();

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);
  const opacity_2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  return (
    <>
      <motion.div className="my-[10%] p-3" style={{ scale, opacity: opacity_2 }}>
        <div className="text-start text-blue-600 mx-5">
          <h3 className="max-md:text-2xl text-5xl font-bold">ค้นหารายวิชาได้ทันที</h3>
          <p className="max-md:text-xs lg:text-2xl">
            ไม่ว่าจะเป็น วิชาเอก หรือ วิชาศึกษาทั่วไป ก็สามารถจัดตารางกับเราได้
          </p>
        </div>
        <div className="flex my-2 justify-around mt-10">
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <img className="" width={300} src="/showfilterSubject.png" alt="showfilterSubject" />
          </div>
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 flex items-end max-[426px]:hidden">
            <img className="" height={10} src="/Time Table.png" alt="Time Table" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SearchSubjectLand;
