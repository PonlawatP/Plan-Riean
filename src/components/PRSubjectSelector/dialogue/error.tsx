import { CalendarContext } from "@/app/providers/CalendarProvider"
import { useContext } from "react"

export default function DialogError({children}:any, props:any){
    const {
      setViewFilter,
    } = useContext(CalendarContext)
    
    return <div className="pr-dialog-searchnotselgroup h-full flex flex-col justify-center items-center text-pr-text-menu/60">
    <i className='bx bx-error text-[6rem]'></i>
    <p>เกิดปัญหานิดหน่อย ลองมาใหม่อีกครั้งนะ</p>
  </div>
}