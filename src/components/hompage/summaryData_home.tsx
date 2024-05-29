import Link from "next/link";
import { useScroll , useTransform,useViewportScroll,motion} from "framer-motion";

const nav = () =>{
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 0.7], [0.8,  1]);
    const opacity_2 = useTransform(scrollYProgress, [0,0.8, 1], [0, 1, 0]);
    return(
        <>
            <motion.div className="my-[10%]"
                style={{scale}}
            >
                <div className="text-start text-blue-600 mx-5">
                    <h3 className="max-md:text-2xl text-5xl font-bold">รวบรวมข้อมูลชมรมไว้ที่นี่</h3>
                    <p className="max-md:text-xs lg:text-2xl">เพื่อให้คุณสามารถเลือกชมรมที่เหมาะสม</p> 
                    <p className="max-md:text-xs lg:text-2xl">มีข้อมูลที่ใช้ตัดสินใจเข้าร่วมกิจกรรมได้มากขึ้น</p> 
                </div>
                <div className="my-2">
                    
                </div>
            </motion.div>
        </>
    )
}

export default nav;