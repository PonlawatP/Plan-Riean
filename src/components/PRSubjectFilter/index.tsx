import { CalendarContext, CalendarFilterContext } from "@/app/providers/CalendarProvider"
import { useContext, useEffect, useState } from "react"
import { name_days } from "../PRCalendarSubject";
import FilterPanel from "./filterPanel";
import { useBreakpoint } from "@/app/utils/useBreakpoint";
import SubjectObject from "./SubjectObject";
import { getSubjectColor } from "@/app/utils/msu/subjectUtils";
import SubjectGroup from "./ChildFilterGroup";
import ChildFilterGroup from "./ChildFilterGroup";
import MasterObject from "./MasterObject";
import RoomFloorObject from "./RoomFloorObject";
import { IFloorData, IRoomData, roomsDummy } from "@/app/utils/test-data/rooms";

export default function PRSubjectFilter({children}:any, props:any){
    const {
        viewSchedule,
        viewFilter,
        topbarToggle,
        calsel_data,
        setCalselData,
    } = useContext(CalendarContext)

    const f = useContext(CalendarFilterContext);

    const {
      group,
      subject,
      day,
      time,
      room,
      master
  } = f.filter;

  const {updated} = calsel_data

  const { isBelowLg } = useBreakpoint("lg");

    function elemButton(msg: any, onClickEvent:()=>void = () => {}, isOn: boolean=false, classAdd:string="", keyName:any=undefined){
      return <button key={keyName} onClick={onClickEvent} className={`h-fit px-2 md:px-2 py-1 rounded-lg border-b-[3px] overflow-hidden truncate active:border-pr-bg ${classAdd !== "" ? classAdd : isOn ? "text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600" : "text-pr-text-menu bg-pr-bg border-slate-400/50 hover:bg-slate-300 active:bg-slate-400 active:text-white/80"}`}>
      {msg}
      </button>
    }

    function getTimeNotAll(number=-1){
      return number >= 0 ? time.filter((t:string)=>t !== "all")[number] : time.filter((t:string)=>t !== "all")
    }

    function test(ts:any=<></>){
      const t = []
      for (let index = 0; index < 30; index++) {
        t.push(ts)
      }
      return t
    }

    const [tempOn, setTempOn] = useState(false)
    useEffect(()=>{
      if(viewFilter){
        setTempOn(viewFilter)
      } else {
        setTimeout(()=>{
          setTempOn(false)
        }, 150)
      }
    },[viewFilter])

    return <>
      <section className={`pr-subject-filter pointer-events-none smooth-all absolute lg:left-[465px] md:p-8 w-full md:w-auto bottom-0 h-full grid z-10 lg:z-auto ${!viewSchedule || topbarToggle.init || topbarToggle.pre || !viewFilter ? "opacity-0 translate-y-10 lg:translate-y-0 lg:-translate-x-10 invisible" : ""}`}>
        {viewFilter || tempOn ? <div className={`pr-subject-filter-body pointer-events-auto relative grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 md:w-[450px] h-full overflow-auto p-1 lg:pt-6 rounded-3xl border-[1px] border-pr-bg-3/20 bg-white backdrop-blur-lg`}>
          {/* header */}
          <section className="pr-subject-header flex lg:hidden justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
            <div className="flex gap-2 items-center font-semibold text-xl">
              <button onClick={f.handleFilterPanel} className='lg:hidden hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10'>
                <i className="bx bx-chevron-left text-3xl translate-y-[2px]"></i>
              </button>
              <div className="">
                <h1>คัดกรองรายวิชา</h1>
                {updated == "null" ? null : <p className='text-sm font-normal text-pr-gray-1'>อัพเดต: {updated}</p>}
              </div>
            </div>
            <button onClick={f.handleFilterPanel} className={`hidden lg:block h-fit px-2 py-1 mr-2 rounded-lg ${viewFilter ? "text-white/80 bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80" : "text-pr-text-menu bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80"}`}>
              <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
            </button>
          </section>
          {/* content */}
          <div className="content w-full h-full relative grid grid-rows-[1fr_auto]">
            <section className="pr-subject-filter-content relative h-full overflow-auto fade-y p-5 pt-0">
              <div className="pr-filter-group pt-2 pb-6">
                <p className="font-semibold text-pr-text-menu">หมวดหมู่รายวิชา</p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {elemButton("หมวด 1", ()=>f.GroupFilterTogglePRC("ge-1"), f.isGroupFilterOn("ge-1"))}
                  {elemButton("หมวด 2", ()=>f.GroupFilterTogglePRC("ge-2"), f.isGroupFilterOn("ge-2"))}
                  {elemButton("หมวด 3", ()=>f.GroupFilterTogglePRC("ge-3"), f.isGroupFilterOn("ge-3"))}
                  {elemButton("หมวด 4", ()=>f.GroupFilterTogglePRC("ge-4"), f.isGroupFilterOn("ge-4"))}
                  {elemButton("หมวด 5", ()=>f.GroupFilterTogglePRC("ge-5"), f.isGroupFilterOn("ge-5"))}
                </div>
                <div className={`mt-2 grid grid-cols-4 gap-2 ${false ? "opacity-60" : ""}`}>
                  {elemButton("พื้นฐาน", ()=>f.GroupFilterTogglePRC("fund"), f.isGroupFilterOn("fund"))}
                  {elemButton("เอกบังคับ", ()=>f.GroupFilterTogglePRC("mainf"), f.isGroupFilterOn("mainf"))}
                  {elemButton("เอกเลือก", ()=>f.GroupFilterTogglePRC("mainc"), f.isGroupFilterOn("mainc"))}
                  {elemButton("วิชาเสรี", ()=>f.GroupFilterTogglePRC("free"), f.isGroupFilterOn("free"))}
                </div>
              </div>
              <div className="pr-filter-group pb-6">
                <p className="font-semibold text-pr-text-menu">เฉพาะรายวิชา</p>
                <div className="mt-1 grid grid-cols-4 gap-2">
                  {subject.map((s:string)=>{
                    const colors = getSubjectColor(s);
                    return elemButton(s, ()=>f.SubjectFilterTogglePRC(s), true, `${colors.color} ${colors.bgColor} border-slate-600/50 hover:opacity-80`, `subject-filter-${s}`)
                  })}
                  {elemButton(<span className="relative"><p className="invisible">t</p><i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i></span>,()=>f.setSubjectViewFilter(true), false)}
                </div>
              </div>
              <div className="pr-filter-group pb-6">
                <p className="font-semibold text-pr-text-menu">วันที่เรียน</p>
                <div className="mt-1 grid grid-cols-5 gap-2">
                  {name_days.map((d, dind:number)=>elemButton(d.date_th, ()=>f.DayFilterTogglePRC(d.date_en_2), f.isDayFilterOn(d.date_en_2), "", dind))}
                </div>
              </div>
              <div className="pr-filter-group pb-6">
                <p className="font-semibold text-pr-text-menu">เวลาที่เรียน</p>
                <div className="mt-1 grid grid-cols-5 gap-2">
                  {elemButton("ทั้งหมด", ()=>f.TimeFilterTogglePRC(true), f.isTimeFilterOn(true))}
                  {
                    getTimeNotAll().length == 2
                    ?
                      <>
                        {elemButton(getTimeNotAll(0).replaceAll("-",""), ()=>f.SingleTimeFilterTogglePRC(getTimeNotAll(0)), f.isTimeFilterOn(false, getTimeNotAll(0)))}
                        <span className="flex justify-center items-center text-pr-gray-1">ถึง</span>
                        {elemButton(getTimeNotAll(1).replaceAll("-",""), ()=>f.SingleTimeFilterTogglePRC(getTimeNotAll(1)), f.isTimeFilterOn(false, getTimeNotAll(1)))}
                      </>
                    :
                    getTimeNotAll().length == 1
                    ?
                      <>
                        {elemButton(getTimeNotAll(0).replaceAll("-",""), ()=>f.SingleTimeFilterTogglePRC(getTimeNotAll(0)), f.isTimeFilterOn(false, getTimeNotAll(0)))}
                        <span className="flex justify-center items-center text-pr-gray-1">เป็นต้นไป</span>
                      </>
                    :
                    null
                  }
                  {elemButton(<span className="relative"><p className="invisible">t</p><i className="bx bx-time-five text-2xl absolute top-0 -translate-x-1/2"></i></span>, ()=>f.TimeFilterTogglePRC(false, "08:00", "10:00"), f.isTimeFilterOn())}
                </div>
              </div>
              <div className="pr-filter-group pb-6">
                <p className="font-semibold text-pr-text-menu">อาจารย์ผู้สอน</p>
                <div className="mt-1 grid grid-cols-4 gap-2">
                  {master.map((m:string, mindex:number)=>elemButton(m.split(".")[m.split(".").length-1], ()=>f.MasterFilterTogglePRC(m), f.isMasterFilterOn(m), "", `master-filter-${mindex}`))}
                  {elemButton(<span className="relative"><p className="invisible">t</p><i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i></span>,()=>f.setMasterViewFilter(true), false)}
                </div>
              </div>
              <div className="pr-filter-group pb-6">
                <p className="font-semibold text-pr-text-menu">ตึกที่เรียน</p>
                <div className="mt-1 grid grid-cols-4 gap-2">
                  {room.map((r:string, rindex:number)=>elemButton(r, ()=>f.FloorFilterTogglePRC(r), f.isRoomFilterOn(r), "", `floor-filter-${rindex}`))}
                  {elemButton(<span className="relative"><p className="invisible">t</p><i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i></span>,()=>f.setRoomViewFilter(true), false)}
                </div>
              </div>
            </section>
            <section className="pr-subject-actions z-10 p-5 pt-2">
              <div className="pr-filter-btn flex gap-3 justify-end">
                <button disabled={calsel_data.isLoading} onClick={()=>f.handleFilterSubmit(true)} className={`w-24 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80 ${calsel_data.isLoading ? "pointer-events-none opacity-50" : ""}`}>
                  ล้าง
                </button>
                <button disabled={calsel_data.isLoading} onClick={()=>{if(isBelowLg){f.handleFilterPanel()} f.handleFilterSubmit()}} className={`w-24 h-fit px-2 py-1 rounded-lg border-b-[3px] active:border-0 text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80 ${calsel_data.isLoading ? "pointer-events-none opacity-50" : ""}`}>
                  คัดกรอง
                </button>
              </div>
            </section>
          </div>
        </div> : null}
      </section>

      <FilterPanel
        title="เฉพาะรายวิชา"
        placeholder="รหัส-ชื่อวิชา..."
        isOn={f.subjectViewFilter}
        onClose={()=>{
          f.setSubjectViewFilter(false)
        }}
        onSearch={(e:string)=>{
          // search
          console.log(e)
        }}
      >
        <ChildFilterGroup 
          title="หมวดหมู่ที่ 1"
          desc="ทักษะการเรียนรู้ตลอดชีวิต"
        >
            <SubjectObject
            code={"0041001"}
            title={"Preparatory English"}
            desc={"เตรียมความพร้อมภาษาอังกฤษ"}
            />
            <SubjectObject
            code={"0041002"}
            title={"2nd Subject"}
            desc={"วิชาที่ 2"}
            />
        </ChildFilterGroup>

      </FilterPanel>
      <FilterPanel
        title="ตึกที่เรียน"
        placeholder="ชื่อตึก-รหัสห้อง"
        isOn={f.roomViewFilter}
        onClose={()=>{
          f.setRoomViewFilter(false)
        }}
        onClear={()=>{
          f.resetRoomViewFilter()
        }}
        onSearch={(e:string)=>{
          // search
          console.log(e)
        }}
      >
        {
          roomsDummy.map((r:IRoomData, rindex)=><ChildFilterGroup
            key={rindex}
            title={r.place}
            desc={r.place_name_th}
            checkbox
            className={`h-16`}
            img={r.banner}
            checkedAllText="เลือกตึกนี้"
            checked={f.getFloorToggledInPlace(r) > 0}
            checkedAll={f.getFloorToggledInPlace(r) == f.getFloorAmountInPlace(r)}
            onCheckedClick={(e:string)=>{
              f.AllFloorFilterTogglePRC(e)
            }}
            onClose={()=>{
              f.setRoomViewFilter(false)
            }}
            onClear={()=>{
              f.resetRoomViewFilter()
            }}
            subDesc={`${f.getFloorToggledInPlace(r)}/${f.getFloorAmountInPlace(r)} ชั้น`}
          >
            {r.floors.map((temp:IFloorData, rxIndex:number)=><RoomFloorObject key={rxIndex} title={`ชั้น ${temp.floor}`} place={r.place} floor={temp.floor}/>)}
          </ChildFilterGroup>

          )
        }
      </FilterPanel>
      <FilterPanel
        title="อาจารย์ผู้สอน"
        placeholder="ชื่ออาจารย์"
        isOn={f.masterViewFilter}
        onClose={()=>{
          f.setMasterViewFilter(false)
        }}
        onClear={()=>{
          f.resetMasterViewFilter()
        }}
        onSearch={(e:string)=>{
          // search
          console.log(e)
        }}
      >

          <MasterObject
            name="ผศ.ดร. วรัญญู แก้วดวงตา"
            other_name="Waranyoo Kaewduangta"
          />
          <MasterObject
            name="อ. นนทิวรรธน์ จันทนะผะลิน"
          />
          <MasterObject
            name="Ms. Tyeyoung Yang"
            other_name="Tyeyoung Yang"
          />
      </FilterPanel>
  </>
}