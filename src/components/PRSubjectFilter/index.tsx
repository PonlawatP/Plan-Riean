import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { useContext, useEffect, useState } from 'react';
import { name_days } from '../PRCalendarSubject';
import FilterPanel from './filterPanel';
import { useBreakpoint } from '@/app/utils/useBreakpoint';
import SubjectObject from './SubjectObject';
import { getSubjectColor } from '@/app/utils/msu/subjectUtils';
import SubjectGroup from './ChildFilterGroup';
import ChildFilterGroup from './ChildFilterGroup';
import MasterObject from './MasterObject';
import RoomFloorObject from './RoomFloorObject';
import { IFloorData, IRoomData, roomsDummy } from '@/app/utils/test-data/rooms';
import { Ifilter, getData, getLecturerDataBySemaster, getSubjectDataByGroup } from '@/app/utils/subjectAPI';
import {
  IGroupCoursesetData,
  IGroupCoursesetGroupData,
  IGroupFacultyData,
  IGroupMajorData,
  groupDummy,
} from '@/app/utils/test-data/group';
import GroupMajorObject from './GroupMajorObject';
import { getUniversityData } from '@/app/utils/universityAPI';

export default function PRSubjectFilter({ children }: any, props: any) {
  const {
    viewSchedule,
    viewFilter,
    topbarToggle,
    calsel_data,
    setCalselData,
    getCurrentPlan,
    uniFacGroupData,
    setUniFacGroupData,
    uniGroupSubjectData,
    setUniGroupSubjectData,
    uniLecturerData,
    setUniLecturerData,
  } = useContext(CalendarContext);

  const f = useContext(CalendarFilterContext);

  const { group, subject, day, time, room, master } = f.filter;

  const { updated } = calsel_data;

  const { isBelowLg } = useBreakpoint('lg');

  const [filterTemp, setFilterTemp] = useState([]);
  const [filterMasterTemp, setFilterMasterTemp] = useState([]);

  function elemButton(
    msg: any,
    onClickEvent: () => void = () => {},
    isOn: boolean = false,
    classAdd: string = '',
    keyName: any = undefined,
    disable = false,
  ) {
    return (
      <button
        key={keyName}
        disabled={disable}
        onClick={onClickEvent}
        className={`h-fit px-2 md:px-2 py-1 rounded-lg border-b-[3px] overflow-hidden truncate active:border-pr-bg ${
          classAdd !== ''
            ? classAdd
            : isOn
            ? 'text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600'
            : 'text-pr-text-menu bg-pr-bg border-slate-400/50 hover:bg-slate-300 active:bg-slate-400 active:text-white/80'
        }`}
      >
        {msg}
      </button>
    );
  }

  function getTimeNotAll(number = -1) {
    return number >= 0 ? time.filter((t: string) => t !== 'total')[number] : time.filter((t: string) => t !== 'total');
  }

  function test(ts: any = <></>) {
    const t = [];
    for (let index = 0; index < 30; index++) {
      t.push(ts);
    }
    return t;
  }

  const [tempOn, setTempOn] = useState(false);
  useEffect(() => {
    if (viewFilter) {
      setTempOn(viewFilter);
    } else {
      setTimeout(() => {
        setTempOn(false);
      }, 150);
    }
  }, [viewFilter]);

  const [timeSlotToggle, setTimeSlotToggle] = useState(-1);
  const [ctimeSlotToggle, setCTimeSlotToggle] = useState(0);
  const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  return (
    <>
      <section
        className={`pr-subject-filter pointer-events-none smooth-all absolute lg:left-[465px] md:p-8 w-full md:w-auto bottom-0 h-full grid z-10 lg:z-auto ${
          !viewSchedule || topbarToggle.init || topbarToggle.pre || !viewFilter
            ? 'opacity-0 translate-y-10 lg:translate-y-0 lg:-translate-x-10 invisible'
            : ''
        }`}
      >
        {viewFilter || tempOn ? (
          <div
            className={`pr-subject-filter-body pointer-events-auto relative grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 md:w-[450px] h-full overflow-auto p-1 lg:pt-6 rounded-3xl border-[1px] border-pr-bg-3/20 bg-white backdrop-blur-lg`}
          >
            {/* header */}
            <section className="pr-subject-header flex lg:hidden justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
              <div className="flex gap-2 items-center font-semibold text-xl">
                <button
                  onClick={f.handleFilterPanel}
                  className="lg:hidden hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10"
                >
                  <i className="bx bx-chevron-left text-3xl translate-y-[2px]"></i>
                </button>
                <div className="">
                  <h1>คัดกรองรายวิชา</h1>
                  {updated == 'null' ? null : <p className="text-sm font-normal text-pr-gray-1">อัพเดต: {updated}</p>}
                </div>
              </div>
              <button
                onClick={f.handleFilterPanel}
                className={`hidden lg:block h-fit px-2 py-1 mr-2 rounded-lg ${
                  viewFilter
                    ? 'text-white/80 bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80'
                    : 'text-pr-text-menu bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'
                }`}
              >
                <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
              </button>
            </section>
            {/* content */}
            <div className="content w-full h-full relative grid grid-rows-[1fr_auto]">
              <section className="pr-subject-filter-content relative h-full overflow-auto fade-y p-5 pt-0">
                <div className="pr-filter-group pt-2 pb-6">
                  <p className="font-semibold text-pr-text-menu">หมวดหมู่รายวิชา</p>
                  {/* TODO: temp before Final Project Phase just enabled it for now */}
                  <div
                    className={`mt-2 grid grid-cols-4 sm:grid-cols-5 gap-2 ${
                      subject.length > 0 ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  >
                    {elemButton('หมวด 1', () => f.GroupFilterTogglePRC('0041*'), f.isGroupFilterOn('0041*'))}
                    {elemButton('หมวด 2', () => f.GroupFilterTogglePRC('0042*'), f.isGroupFilterOn('0042*'))}
                    {elemButton('หมวด 3', () => f.GroupFilterTogglePRC('0043*'), f.isGroupFilterOn('0043*'))}
                    {elemButton('หมวด 4', () => f.GroupFilterTogglePRC('0044*'), f.isGroupFilterOn('0044*'))}
                    {elemButton('หมวด 5', () => f.GroupFilterTogglePRC('0045*'), f.isGroupFilterOn('0045*'))}
                    {/* TODO: all of hard worked this button so like complicated */}
                    {/* {elemButton(
                      f.getGroupMajorFilterNamePRC(),
                      () => f.setMajorViewFilter(true),
                      f.getGroupMajorFilterNamePRC() !== 'เลือกสาขา',
                      `col-span-3 sm:col-span-5 ${
                        f.getGroupMajorFilterNamePRC() !== 'เลือกสาขา'
                          ? 'text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600'
                          : 'text-pr-text-menu bg-pr-bg border-slate-400/50 hover:bg-slate-300 active:bg-slate-400 active:text-white/80'
                      }`,
                    )} */}
                  </div>
                  {/* TODO: Final Project Phase just disable it for now */}
                  {/* <div className="mt-2 grid grid-cols-4 xs:hidden gap-2">
                    {elemButton('หมวด 1', () => f.GroupFilterTogglePRC('0041*'), f.isGroupFilterOn('0041*'))}
                    {elemButton('หมวด 2', () => f.GroupFilterTogglePRC('0042*'), f.isGroupFilterOn('0042*'))}
                    {elemButton('หมวด 3', () => f.GroupFilterTogglePRC('0043*'), f.isGroupFilterOn('0043*'))}
                    {elemButton('หมวด 4', () => f.GroupFilterTogglePRC('0044*'), f.isGroupFilterOn('0044*'))}
                    {elemButton('หมวด 5', () => f.GroupFilterTogglePRC('0045*'), f.isGroupFilterOn('0045*'))}
                    {elemButton('พื้นฐาน', () => f.GroupFilterTogglePRC('fund'), f.isGroupFilterOn('fund'))}
                    {elemButton('บังคับ', () => f.GroupFilterTogglePRC('mainf'), f.isGroupFilterOn('mainf'))}
                    {elemButton('เลือก', () => f.GroupFilterTogglePRC('mainc'), f.isGroupFilterOn('mainc'))}
                    {elemButton('วิชาเสรี', () => f.GroupFilterTogglePRC('free'), f.isGroupFilterOn('free'))}
                  </div>
                  <div className="mt-2 hidden xs:grid grid-cols-5 gap-2">
                    {elemButton('หมวด 1', () => f.GroupFilterTogglePRC('0041*'), f.isGroupFilterOn('0041*'))}
                    {elemButton('หมวด 2', () => f.GroupFilterTogglePRC('0042*'), f.isGroupFilterOn('0042*'))}
                    {elemButton('หมวด 3', () => f.GroupFilterTogglePRC('0043*'), f.isGroupFilterOn('0043*'))}
                    {elemButton('หมวด 4', () => f.GroupFilterTogglePRC('0044*'), f.isGroupFilterOn('0044*'))}
                    {elemButton('หมวด 5', () => f.GroupFilterTogglePRC('0045*'), f.isGroupFilterOn('0045*'))}
                  </div>
                  <div className={`mt-2 hidden xs:grid grid-cols-4 gap-2 ${false ? "opacity-60" : ""}`}>
                  {elemButton("พื้นฐาน", ()=>f.GroupFilterTogglePRC("fund"), f.isGroupFilterOn("fund"))}
                  {elemButton("เอกบังคับ", ()=>f.GroupFilterTogglePRC("mainf"), f.isGroupFilterOn("mainf"))}
                  {elemButton("เอกเลือก", ()=>f.GroupFilterTogglePRC("mainc"), f.isGroupFilterOn("mainc"))}
                  {elemButton("วิชาเสรี", ()=>f.GroupFilterTogglePRC("free"), f.isGroupFilterOn("free"))}
                </div> */}
                </div>
                <div className="pr-filter-group pb-6">
                  <p className="font-semibold text-pr-text-menu">เฉพาะรายวิชา</p>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {subject.map((s: string) => {
                      const colors = getSubjectColor(s);
                      return elemButton(
                        s,
                        () => f.SubjectFilterTogglePRC(s),
                        true,
                        `${colors.color} ${colors.bgColor} border-slate-600/50 hover:opacity-80`,
                        `subject-filter-${s}`,
                      );
                    })}
                    {elemButton(
                      <span className="relative block">
                        <p className="invisible">t</p>
                        <i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i>
                      </span>,
                      () => f.setSubjectViewFilter(true),
                      false,
                    )}
                  </div>
                </div>
                <div className="pr-filter-group pb-6">
                  <p className="font-semibold text-pr-text-menu">วันที่เรียน</p>
                  <div className="mt-1 grid grid-cols-4 xs:grid-cols-5 gap-2">
                    {name_days.map((d, dind: number) =>
                      elemButton(
                        d.date_th,
                        () => f.DayFilterTogglePRC(d.date_en_2),
                        f.isDayFilterOn(d.date_en_2),
                        '',
                        dind,
                      ),
                    )}
                  </div>
                </div>
                <div className="pr-filter-group pb-6">
                  <p className="font-semibold text-pr-text-menu">เวลาที่เรียน</p>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {elemButton('ทั้งหมด', () => f.TimeFilterTogglePRC(true), f.isTimeFilterOn(true))}
                    {getTimeNotAll().length == 2 ? (
                      <>
                        {elemButton(
                          getTimeNotAll(0).replaceAll('-', ''),
                          () => f.SingleTimeFilterTogglePRC(getTimeNotAll(0)),
                          f.isTimeFilterOn(false, getTimeNotAll(0)),
                        )}
                        <span className="flex justify-center items-center text-pr-gray-1">ถึง</span>
                        {elemButton(
                          getTimeNotAll(1).replaceAll('-', ''),
                          () => f.SingleTimeFilterTogglePRC(getTimeNotAll(1)),
                          f.isTimeFilterOn(false, getTimeNotAll(1)),
                        )}
                      </>
                    ) : getTimeNotAll().length == 1 ? (
                      <>
                        {elemButton(
                          getTimeNotAll(0).replaceAll('-', ''),
                          () => f.SingleTimeFilterTogglePRC(getTimeNotAll(0)),
                          f.isTimeFilterOn(false, getTimeNotAll(0)),
                        )}
                        <span className="flex justify-center items-center text-pr-gray-1">เป็นต้นไป</span>
                      </>
                    ) : null}
                    {elemButton(
                      <span className="relative block">
                        <p className="invisible">t</p>
                        <i className="bx bx-time-five text-2xl absolute top-0 -translate-x-1/2"></i>
                      </span>,
                      () => f.setTimeSetViewFilter(true),
                      // () => f.TimeFilterTogglePRC(false, '08:00', '10:00'),
                      f.isTimeFilterOn(),
                    )}
                  </div>
                </div>
                <div className="pr-filter-group pb-6">
                  <p className="font-semibold text-pr-text-menu">อาจารย์ผู้สอน</p>
                  <div className="mt-1 grid grid-cols-1 xs:grid-cols-2 gap-2">
                    {master.map((m: string, mindex: number) =>
                      elemButton(
                        m.split('.')[m.split('.').length - 1],
                        () => f.MasterFilterTogglePRC(m),
                        f.isMasterFilterOn(m),
                        '',
                        `master-filter-${mindex}`,
                      ),
                    )}
                    {elemButton(
                      <span className="relative block">
                        <p className="invisible">t</p>
                        <i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i>
                      </span>,
                      () => f.setMasterViewFilter(true),
                      false,
                    )}
                  </div>
                </div>
                {/* TODO: filter place and floors */}
                {/* <div className="pr-filter-group pb-6">
                  <p className="font-semibold text-pr-text-menu">ตึกที่เรียน</p>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {room.map((r: string, rindex: number) =>
                      elemButton(r, () => f.FloorFilterTogglePRC(r), f.isRoomFilterOn(r), '', `floor-filter-${rindex}`),
                    )}
                    {elemButton(
                      <span className="relative block">
                        <p className="invisible">t</p>
                        <i className="bx bx-search text-2xl absolute top-0 -translate-x-1/2"></i>
                      </span>,
                      () => f.setRoomViewFilter(true),
                      false,
                    )}
                  </div>
                </div> */}
              </section>
              <section className="pr-subject-actions z-10 p-5 pt-2">
                <div className="pr-filter-btn flex gap-3 justify-end">
                  <button
                    disabled={calsel_data.isLoading}
                    onClick={() => f.handleFilterSubmit(true)}
                    className={`w-24 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80 ${
                      calsel_data.isLoading ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    ล้าง
                  </button>
                  <button
                    disabled={calsel_data.isLoading}
                    onClick={() => {
                      if (isBelowLg) {
                        f.handleFilterPanel();
                      }
                      f.handleFilterSubmit();
                    }}
                    className={`w-24 h-fit px-2 py-1 rounded-lg border-b-[3px] active:border-0 text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80 ${
                      calsel_data.isLoading ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    คัดกรอง
                  </button>
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </section>

      <FilterPanel
        title="เฉพาะรายวิชา"
        placeholder="รหัสวิชา..."
        isOn={f.subjectViewFilter}
        onOpen={() => {
          getSubjectDataByGroup(getCurrentPlan().detail?.cr_year, getCurrentPlan().detail?.cr_seamseter, null).then(
            (res: any) => {
              console.log(res.data);
              setUniGroupSubjectData(res.data);
            },
          );
        }}
        onClose={() => {
          f.setSubjectViewFilter(false);
          setFilterTemp([]);
        }}
        onSearch={(e: string) => {
          // search
          console.log(e);
          if (e.trim() == '') {
            setFilterTemp([]);
            return;
          }

          // const flatSubjects = uniGroupSubjectData
          //   .flatMap((fac: any) => fac.groups)
          //   .flatMap((group: any) => group.subjects);

          /* 
            It checks the input pattern and filters the flatSubjects array based on the rules:
            If the input starts and ends with *, it filters codes that include the substring (excluding the * characters).
            If the input starts with *, it filters codes that end with the substring (excluding the starting *).
            If the input ends with *, it filters codes that start with the substring (excluding the ending *).
            If the input doesn't contain *, it filters codes that exactly match the input.
          */
          // function filterCodes(input: string) {
          //   return flatSubjects.filter((subject: any) => {
          //     const code = subject.code;

          //     if (input.startsWith('*') && input.endsWith('*')) {
          //       const term = input.slice(1, -1);
          //       return code.includes(term);
          //     } else if (input.startsWith('*')) {
          //       const term = input.slice(1);
          //       return code.endsWith(term);
          //     } else if (input.endsWith('*')) {
          //       const term = input.slice(0, -1);
          //       return code.startsWith(term);
          //     } else {
          //       return code.startsWith(input);
          //     }
          //   });
          // }
          // console.log(filterCodes(e));

          function filterDataByCode(input: string) {
            return uniGroupSubjectData
              .map((faculty: any) => {
                return {
                  ...faculty,
                  groups: faculty.groups
                    .map((group: any) => {
                      return {
                        ...group,
                        subjects: group.subjects.filter((subject: any) => {
                          const code = subject.code;

                          if (input.startsWith('*') && input.endsWith('*')) {
                            const term = input.slice(1, -1);
                            return code.includes(term);
                          } else if (input.startsWith('*')) {
                            const term = input.slice(1);
                            return code.endsWith(term);
                          } else if (input.endsWith('*')) {
                            const term = input.slice(0, -1);
                            return code.startsWith(term);
                          } else {
                            return code.startsWith(input);
                          }
                        }),
                      };
                    })
                    .filter((group: any) => group.subjects.length > 0),
                };
              })
              .filter((faculty: any) => faculty.groups.length > 0);
          }
          // console.log(filterDataByCode(e));
          const res = filterDataByCode(e);
          setFilterTemp(res.length == 0 ? [null] : res);
          // console.log(filterTemp);
        }}
      >
        {(filterTemp.length != 0 ? filterTemp : uniGroupSubjectData)
          .filter((g: any) => g != null)
          .map((g: any, gIndex: number) => (
            <ChildFilterGroup
              key={gIndex}
              bigCollapse={true}
              title={`กลุ่ม${g.fac_id == 0 ? 'วิชา' + g.fac_name_th : 'วิชาคณะ ' + g.fac_key}`}
              subDesc={
                g.groups.length > 1 && !g.groups[0].global
                  ? `${g.groups.length} หมวด`
                  : `${g.groups.flatMap((group: any) => group.subjects).length} วิชา`
              }
              toggle={filterTemp.length != 0}
            >
              {g.groups.map((gs: any, gsIndex: number) => {
                if (gs.global) {
                  return gs.subjects.map((gsi: any, gsiIndex: number) => (
                    <SubjectObject
                      key={gsiIndex}
                      code={gsi.code}
                      title={gsi.name_en}
                      desc={'เตรียมความพร้อมภาษาอังกฤษ'}
                    />
                  ));
                } else {
                  return (
                    <ChildFilterGroup
                      key={gsIndex}
                      title={gs.header}
                      desc={gs.desc}
                      subDesc={`${gs.subjects.length} วิชา`}
                    >
                      {gs.subjects.map((gsi: any, gsiIndex: number) => (
                        <SubjectObject
                          key={gsiIndex}
                          code={gsi.code}
                          title={gsi.name_en}
                          desc={'เตรียมความพร้อมภาษาอังกฤษ'}
                        />
                      ))}

                      {/* <SubjectObject code={'0041001'} title={'Preparatory English'} desc={'เตรียมความพร้อมภาษาอังกฤษ'} />
                    <SubjectObject code={'0041002'} title={'2nd Subject'} desc={'วิชาที่ 2'} /> */}
                    </ChildFilterGroup>
                  );
                }
              })}
            </ChildFilterGroup>
          ))}
      </FilterPanel>
      <FilterPanel
        title="ตึกที่เรียน"
        placeholder="ชื่อตึก-รหัสห้อง"
        isOn={f.roomViewFilter}
        onClose={() => {
          f.setRoomViewFilter(false);
        }}
        onClear={() => {
          f.resetRoomViewFilter();
        }}
        onSearch={(e: string) => {
          // search
          console.log(e);
        }}
      >
        {roomsDummy.map((r: IRoomData, rindex) => (
          <ChildFilterGroup
            key={rindex}
            title={r.place}
            desc={r.place_name_th}
            checkbox
            className={`h-16`}
            img={r.banner}
            checkedAllText="เลือกตึกนี้"
            checked={f.getFloorToggledInPlace(r) > 0}
            checkedAll={f.getFloorToggledInPlace(r) == f.getFloorAmountInPlace(r)}
            onCheckedClick={(e: string) => {
              f.AllFloorFilterTogglePRC(e);
            }}
            onClose={() => {
              f.setRoomViewFilter(false);
            }}
            onClear={() => {
              f.resetRoomViewFilter();
            }}
            subDesc={`${f.getFloorToggledInPlace(r)}/${f.getFloorAmountInPlace(r)} ชั้น`}
          >
            {r.floors.map((temp: IFloorData, rxIndex: number) => (
              <RoomFloorObject key={rxIndex} title={`ชั้น ${temp.floor}`} place={r.place} floor={temp.floor} />
            ))}
          </ChildFilterGroup>
        ))}
      </FilterPanel>
      <FilterPanel
        title="อาจารย์ผู้สอน"
        placeholder="ชื่ออาจารย์"
        isOn={f.masterViewFilter}
        onOpen={() => {
          getLecturerDataBySemaster(getCurrentPlan().detail?.cr_year, getCurrentPlan().detail?.cr_seamseter, null).then(
            (res: any) => {
              console.log(res.data);
              setUniLecturerData(res.data);
              // setUniGroupSubjectData(res.data);
            },
          );
        }}
        onClose={() => {
          f.setMasterViewFilter(false);
          setUniLecturerData([]);
          setFilterMasterTemp([]);
        }}
        onClear={() => {
          f.resetMasterViewFilter();
        }}
        onSearch={(e: string) => {
          // search
          console.log(e);
          const res = uniLecturerData.filter((l: string) => l.includes(e));
          setFilterMasterTemp(res.length == 0 ? [null] : res);
        }}
      >
        {(filterMasterTemp.length == 0 ? uniLecturerData : filterMasterTemp)
          .filter((m: any) => m != null)
          .map((l: string, lIndex: number) => (
            <MasterObject key={lIndex} name={l} />
          ))}
        {/* <MasterObject name="ผศ.ดร. วรัญญู แก้วดวงตา" other_name="Waranyoo Kaewduangta" />
        <MasterObject name="อ. นนทิวรรธน์ จันทนะผะลิน" />
        <MasterObject name="Ms. Tyeyoung Yang" other_name="Tyeyoung Yang" /> */}
      </FilterPanel>

      <FilterPanel
        title="หมวดหมู่วิชาเอก"
        placeholder="คณะหรือสาขา"
        isOn={f.majorViewFilter}
        onOpen={() => {
          getUniversityData(getCurrentPlan().detail?.uni_id, true, null).then((fac_list: any) => {
            console.log(fac_list.facultys);
            setUniFacGroupData(fac_list.facultys);
          });
        }}
        onClose={() => {
          setUniFacGroupData([]);
          f.setMajorViewFilter(false);
        }}
        onClear={() => {
          f.GroupFilterTogglePRC('_M-', true);
          f.GroupFilterTogglePRC('_M-', true);
        }}
        onSearch={(e: string) => {
          // search
          console.log(e);
        }}
      >
        {uniFacGroupData.map((fac: IGroupFacultyData, findex: number) => (
          <ChildFilterGroup
            key={findex}
            title={fac.fac_name_en}
            desc={fac.fac_name_th}
            className={`h-16`}
            // checkbox
            // img={fac.bg_img}
            // checkedAllText="ทั้งคณะ"
            // checked={f.getFloorToggledInPlace(fac) > 0}
            // checkedAll={f.getFloorToggledInPlace(fac) == f.getFloorAmountInPlace(fac)}
            // onCheckedClick={(e: string) => {
            //   f.AllFloorFilterTogglePRC(e);
            // }}
            // onClose={() => {
            //   f.setRoomViewFilter(false);
            // }}
            // onClear={() => {
            //   f.resetRoomViewFilter();
            // }}
            // subDesc={`${f.getFloorToggledInPlace(fac)}/${f.getFloorAmountInPlace(fac)} ชั้น`}
          >
            {fac.coursesets
              .find((r: IGroupCoursesetGroupData) => r.cr_group_id == 34)
              ?.children.map((temp: IGroupCoursesetData, fxIndex: number) => (
                <GroupMajorObject key={fxIndex} title={`${temp.cr_key}`} desc={temp.name_th} major_key={temp.cr_key} />
              ))}
          </ChildFilterGroup>
        ))}
      </FilterPanel>
      <FilterPanel
        title="เวลาที่เรียน"
        search={false}
        isOn={f.timeSetViewFilter}
        onOpen={() => {}}
        onClose={() => {
          f.setTimeSetViewFilter(false);
          setTimeSlotToggle(-1);
        }}
        onClear={() => {
          f.TimeFilterTogglePRC(false);
          setTimeSlotToggle(-1);
        }}
      >
        <section className="pr-subject-filter-content relative h-full overflow-auto fade-y p-5">
          <div className="pr-filter-group relative h-full grid grid-rows-[auto_1fr]">
            <div className="">
              <p className="font-semibold text-pr-text-menu">กำหนดเวลา</p>
              <div className="mt-1 grid grid-cols-2 gap-3 p-2 rounded-xl border-[1px] border-pr-bg-1">
                <div
                  className={`${timeSlotToggle == 0 ? 'bg-pr-bg' : ''} p-2 px-4 rounded-lg relative cursor-pointer`}
                  onClick={() => setTimeSlotToggle(0)}
                >
                  <p>เวลาเริ่มต้น</p>
                  <h3 className="mt-1 w-16 font-semibold bg-transparent text-xl text-pr-blue">
                    {getTimeNotAll().length >= 1 && !getTimeNotAll(0).includes('-') ? getTimeNotAll(0) : 'ทั้งหมด'}
                  </h3>
                  {timeSlotToggle == 0 && getTimeNotAll().length >= 1 ? (
                    <span
                      onClick={() => {
                        f.TimeFilterTogglePRC(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 p-2 flex justify-center items-center bg-pr-gray-2 hover:bg-pr-gray-1 text-pr-dark hover:text-white rounded-full"
                    >
                      <i className="bx bx-x"></i>
                    </span>
                  ) : null}
                </div>
                <div
                  className={`${timeSlotToggle == 1 ? 'bg-pr-bg' : ''} p-2 px-4 rounded-lg relative cursor-pointer`}
                  onClick={() => setTimeSlotToggle(1)}
                >
                  <p>เวลาสิ้นสุด</p>
                  <h3 className="mt-1 w-16 font-semibold bg-transparent text-xl text-pr-blue">
                    {getTimeNotAll().length == 2 && !getTimeNotAll(1).includes('-')
                      ? getTimeNotAll(1)
                      : getTimeNotAll().length == 1 || (getTimeNotAll().length == 2 && !getTimeNotAll(1).includes('-'))
                      ? 'ต้นไป'
                      : '-'}
                  </h3>
                  {timeSlotToggle == 1 && getTimeNotAll().length == 2 ? (
                    <span
                      onClick={() => {
                        f.TimeFilterTogglePRC(false, getTimeNotAll(0));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 p-2 flex justify-center items-center bg-pr-gray-2 hover:bg-pr-gray-1 text-pr-dark hover:text-white rounded-full"
                    >
                      <i className="bx bx-x"></i>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            {timeSlotToggle >= 0 ? (
              <div className="clock-picker-slider relative overflow-auto gap-1 w-full mt-6 fade-y">
                {times.map((t: any, tIndex: number) => (
                  <button
                    key={tIndex}
                    onClick={() => {
                      if (timeSlotToggle == 0) {
                        f.TimeFilterTogglePRC(
                          false,
                          `${t.toString().padStart(2, `0`)}:00`,
                          getTimeNotAll().length == 2 ? getTimeNotAll(1) : '',
                        );
                        setTimeSlotToggle(1);
                        setCTimeSlotToggle(1);
                      } else {
                        // console.log(getTimeNotAll().length == 0 ? '08:00' : getTimeNotAll(0));
                        f.TimeFilterTogglePRC(
                          false,
                          getTimeNotAll().length == 0 || getTimeNotAll(0).includes('-') ? '08:00' : getTimeNotAll(0),
                          `${t.toString().padStart(2, `0`)}:00`,
                        );
                        if (ctimeSlotToggle == 1) {
                          setCTimeSlotToggle(0);
                          f.setTimeSetViewFilter(false);
                        }
                      }
                    }}
                    disabled={
                      (getTimeNotAll().length >= 2 &&
                        timeSlotToggle == 0 &&
                        !getTimeNotAll(1).includes('-') &&
                        t > Number.parseInt(getTimeNotAll(1).substring(0, 2))) ||
                      (getTimeNotAll().length >= 1 &&
                        timeSlotToggle == 1 &&
                        t < Number.parseInt(getTimeNotAll(0).substring(0, 2)))
                    }
                    className={`${tIndex == 0 ? 'mt-2' : tIndex == times.length - 1 ? 'mb-2' : ''} group ${
                      getTimeNotAll().length >= timeSlotToggle &&
                      getTimeNotAll(timeSlotToggle) == `${t.toString().padStart(2, '0')}:00`
                        ? 'font-semibold text-white bg-pr-blue hover:text-pr-blue hover:bg-white hover:border-2 border-pr-blue drop-shadow-pr-shadow-text'
                        : 'bg-pr-bg'
                    } ${
                      (getTimeNotAll().length >= 2 &&
                        timeSlotToggle == 0 &&
                        !getTimeNotAll(1).includes('-') &&
                        t > Number.parseInt(getTimeNotAll(1).substring(0, 2))) ||
                      (getTimeNotAll().length >= 1 &&
                        timeSlotToggle == 1 &&
                        t < Number.parseInt(getTimeNotAll(0).substring(0, 2)))
                        ? 'opacity-20'
                        : 'hover:bg-pr-bg-1'
                    } py-1 relative rounded-lg w-full my-1`}
                  >
                    <span className="">{t.toString().padStart(2, '0')}:00 น.</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </FilterPanel>
    </>
  );
}
