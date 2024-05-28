import Link from "next/link";
import { useScroll , useTransform,useViewportScroll,motion} from "framer-motion";

const nav = () =>{
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.8]);
    return(
        <>
            <motion.div className="mt-[25%]"
                style={{scale}}
            >
                <div className="text-end text-blue-600 mx-5">
                    <h3 className="max-md:text-2xl text-5xl font-bold">เราช่วยอะไรคุณได้บ้าง</h3>
                    <p className="mt-2 max-md:text-xs lg:text-2xl">PLAN RIEAN คือตัวช่วยจัดตารางและวางแผนการเรียน ให้ง่ายกว่าที่่เคยเป็น</p> 
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex justify-center mt-10 w-[80vw]">
                        <video className="rounded-xl shadow-xl " width="auto" height="auto" autoPlay muted controls loop>
                            <source src="/SnapTik_App_7288990571484433672-HD.mp4" type="video/mp4"/>
                            <source src="/SnapTik_App_7288990571484433672-HD.ogg" type="video/ogg"/>
                        </video>
                    </div>
                </div>
                
            </motion.div>
        </>
    )
}

export default nav;