import PRCalendarSubject from '@/components/PRCalendarSubject';
import { ThemeContext } from '@/app/providers';
import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import Head from 'next/head';
import { ReactElement, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PlanPageLayout, { newPlanReset } from '@/app/layout/planlayout';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { List } from 'postcss/lib/list';
import { toast } from 'react-toastify';
import { PatternFormat } from 'react-number-format';
import Link from 'next/link';
import { createPlan, getPlanListData } from '@/app/utils/userAPI';
import { getUniversityData, getUniversitySeasons } from '@/app/utils/universityAPI';
import { getStudentEducatedYear } from '../account/first-started';

function PlanPage() {
  const { theme, setTheme } = useContext(ThemeContext);

  const { createNewPlan, newPlanData, setNewPlanData } = useContext(CalendarContext);

  function toggleTheme() {
    console.log('switched to ' + theme);
    setTheme(theme === 'day' ? 'night' : 'day');
  }

  const { data: session, status: session_status } = useSession();
  const redirect = useRouter();

  const animationURL = '/assets/lotties/loading.json';

  const [planList, setPlanList] = useState<any>([]);
  const [uniFacData, setUniFacData] = useState<any>([]);
  const [uniSeason, setUniSeason] = useState<any>([]);

  // TODO: setwebready when load plan in new page
  useEffect(() => {
    let abortController: any;
    // setWebReady(true)
    // TODO:search from API
    if (abortController) {
      // If there is an ongoing request, cancel it
      abortController.abort();
    }

    abortController = new AbortController(); // Create a new AbortController instance
    if (session_status == 'authenticated') {
      getPlanListData(session?.accessToken || '', abortController.signal).then((res) => {
        setPlanList(res.data);
      });
    }

    return () => {
      if (abortController) {
        // If there is an ongoing request, cancel it
        abortController.abort();
      }
      abortController = null;
    };
  }, [session, session_status]);

  const toastId = useRef<any>(null);
  async function handleNewPlanSend() {
    toastId.current = toast('รอสักครู่', { autoClose: false });

    const res = await createPlan(newPlanData, session?.accessToken as string, null);
    console.log(res);
    if (res.success) {
      toast.update(toastId.current, { render: 'สร้างแพลนเรียนใหม่แล้ว', type: toast.TYPE.SUCCESS, autoClose: 5000 });
      setNewPlanData(newPlanReset);
      redirect.push(`/plan/plan/${res.result.plan_id}`);
    } else {
      toast.update(toastId.current, {
        render: `สร้างแพลนเรียนไม่ได้ ${res.message}`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    getUniversityData(1, false, null).then((fac_list: any) => {
      setUniFacData(fac_list.facultys);
      // console.log(fac_list);
    });
    getUniversitySeasons(1, null).then((data: any) => {
      setUniSeason(data.years);
    });
  }, []);

  function getCourseSetRelation(): Array<any> {
    const coursesets = uniFacData.find((f: any) => f.fac_id == newPlanData.fac_id)?.coursesets[0].children || [];
    const std_year = new Date(Date.now()).getFullYear() + 543 - 2500 - getStudentEducatedYear('', newPlanData.std_year);

    // console.log("from_std_id: " + getStudentEducatedYear(firstStepData.std_id), "from_field:", (Number.isNaN(firstStepData.std_year) ? 1 : firstStepData.std_year), same_year, std_year)

    const res_lower = coursesets
      .filter((c: any) => {
        const c_year = Number.parseInt(c.cr_id.toString().substring(3, 5));
        return c_year <= std_year;
      })
      .sort((a: any, b: any) => {
        const a_year = Number.parseInt(a.cr_id.toString().substring(3, 5));
        const b_year = Number.parseInt(b.cr_id.toString().substring(3, 5));
        return a_year - b_year;
      })
      .map((c: any) => {
        return { ...c, cr_id_sub: c.cr_id.toString().substring(3, 5) };
        // return c.cr_key + " " + c.cr_id + " " + c.cr_id.toString().substring(3,5)
        // return {cr_key: c.cr_key, cr_id: c.cr_id, cr_id_sub: c.cr_id.toString().substring(3,5)}
      });

    function filterUniqueMaxSub(data: any) {
      const grouped = data.reduce((acc: any, item: any) => {
        const key = item.cr_key;
        // Store the object if it's the first one, or if its cr_id_sub is higher
        if (!acc[key] || item.cr_id_sub > acc[key].cr_id_sub) {
          acc[key] = item;
        }
        return acc;
      }, {});
      return Object.values(grouped);
    }
    const uniqueMaxSubResult = filterUniqueMaxSub(res_lower);
    // console.log(uniqueMaxSubResult);
    return uniqueMaxSubResult;
  }
  function getPlanListElem(folder = false) {
    const elems = planList.map((p: any, pind: number) => {
      if (folder && p.is_folder) {
        return (
          <button
            key={pind}
            className="plan-folder relative w-[8em] h-[8em] md:w-[9em] md:h-[9em] p-2 rounded-2xl flex flex-col items-center group text-pr-dark hover:bg-pr-gray-1 hover:text-white"
          >
            <div className="relative flex justify-center items-center w-full h-4/6">
              <i className="bx bxs-folder text-[4em]"></i>
            </div>
            <p className="relative whitespace-normal line-clamp-2 text-center">
              ชื่อโฟลเดอร์ทดสอบ 1234567 asdasdasdasd
            </p>
          </button>
        );
      } else {
        return (
          <Link
            key={pind}
            href={`/plan/plan/${p.plan_id}`}
            className="plan-folder relative w-[8em] h-[8em] md:w-[9em] md:h-[9em] p-2 rounded-2xl flex flex-col items-center group text-pr-dark hover:bg-black/60 hover:text-white"
          >
            <div className="relative flex justify-center items-center w-full h-4/6 pointer-events-none">
              <Image
                src={'/assets/svg/plan_ico.svg'}
                className="group-hover:hidden"
                alt="Plan"
                width={70}
                height={70}
              ></Image>
              <Image
                src={'/assets/svg/plan_white_ico.svg'}
                className="hidden group-hover:block"
                alt="Plan"
                width={70}
                height={70}
              ></Image>
              {/* <i className="bx bxs-folder text-[4em]"></i> */}
            </div>
            <p className="relative whitespace-normal line-clamp-2 text-center">{p.plan_name}</p>
          </Link>
        );
      }
    });

    return elems;
  }

  return (
    <div className={`relative w-full h-full whitespace-nowrap overflow-auto`}>
      <Head>
        <title>รายการแผนของคุณ : Planriean</title>
      </Head>
      {/* <button onClick={toggleTheme}>Dark</button> */}

      {/* loading overlay */}
      <div
        className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${
          session_status == 'authenticated' ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <div className="box text-pr-blue text-center">
          <Player src={animationURL} autoplay loop speed={1} style={{ height: 100 }} />
          Loading
        </div>
      </div>

      <div className={`smooth-out w-full h-full relative grid grid-rows-[auto_minmax(0,1fr)] p-8 gap-4`}>
        {/* Summary Calendar Component */}
        <h1 className="text-2xl font-medium">แผนการเรียนของคุณ</h1>
        <div className="bg-white/60 border-[1px] rounded-3xl drop-shadow-xl p-4 relative overflow-auto">
          {getPlanListElem().length == 0 ? (
            <div className="h-full w-full flex flex-col justify-center items-center text-pr-text-menu/60">
              <i className="bx bx-task text-[6rem]"></i>
              <p>ยังไม่มีแพลนเรียนเหรอ</p>
              <p>ลองเพิ่มดูซักอันสิ</p>
              <button
                onClick={() => createNewPlan()}
                className="mt-4 text-pr-text-menu h-fit px-2 py-1 mr-2 rounded-lg bg-pr-msu-1 border-b-[3px] border-slate-400/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-msu-1 active:border-0 active:bg-pr-msu-1-60 active:text-white/80"
              >
                <i className="bx bx-plus text-xl translate-y-[3px] mr-1"></i> สร้างแผนใหม่
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">{getPlanListElem()}</div>
          )}
        </div>
      </div>
      {/* modal */}
      <div
        className={`fixed left-0 top-0 w-full h-full bg-black/30 flex items-end lg:items-center justify-center transition-opacity duration-200 ${
          newPlanData.open ? '' : 'invisible opacity-0'
        }`}
        id="modal_overlay"
        onClick={(e: any) => {
          if (e.target.id == 'modal_overlay') {
            setNewPlanData(newPlanReset);
          }
        }}
      >
        <div
          className={`w-full lg:w-1/2 p-6 bg-white rounded-t-2xl lg:rounded-b-2xl relative transition-all duration-300 ${
            newPlanData.open ? '' : 'translate-y-8'
          }`}
        >
          <h2 className="mt-2 text-2xl font-medium">ตั้งค่าแผนเรียนใหม่</h2>
          <div className="mt-8 relative h-10">
            <input
              type="text"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={newPlanData.plan_name}
              onChange={(e) => {
                setNewPlanData((prev: any) => ({ ...prev, plan_name: e.target.value }));
              }}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              ชื่อแผนการเรียน
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mt-8 relative h-10 col-span-2">
              <select
                // ref={ref_major}
                onChange={(e: any) => {
                  setNewPlanData((prev: any) => ({ ...prev, cr_year: e.target.value }));
                }}
                disabled
                value={newPlanData.cr_year}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {uniSeason.map((d: any, dind: number) => (
                  <option key={dind} value={d.year}>{`${d.year}`}</option>
                ))}
                {/* <option value="2567">{`2567`}</option> */}
                {/* {getCourseSetRelation().map((c: any, cind: number) => (
                  <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
                ))} */}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                ปีที่เรียน
              </label>
            </div>

            <div className="mt-8 relative h-10">
              <select
                // ref={ref_major}
                onChange={(e: any) => {
                  setNewPlanData((prev: any) => ({ ...prev, cr_seamseter: e.target.value }));
                }}
                disabled
                value={newPlanData.cr_seamseter}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="1">{`1`}</option>
                {/* {getCourseSetRelation().map((c: any, cind: number) => (
                  <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
                ))} */}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                เทอมที่เรียน
              </label>
            </div>
          </div>
          {/* TODO: Final Project Phase just disable it for now */}
          {/* <div className="mt-8">
            <h2 className="mt-2 text-2xl font-medium">ข้อมูลตารางเรียน</h2>
            <div className={`flex justify-between items-center py-2`}>
              <div className="pt-1">
                <div className="flex items-start text-pr-gray-1">
                  <i className="mr-4 bx bx-notepad"></i>
                  <p className="text-sm">วิทยาการคอมพิวเตอร์</p>
                </div>
                <div className="mt-1 flex items-start">
                  <i className="mr-4 bx bx-id-card text-pr-gray-1"></i>
                  <div className="flex gap-8 text-sm">
                    {!newPlanData.custom_plan_open ? <p>67011212087</p> : null}
                    <p className="text-pr-gray-1">
                      ชั้นปีที่<span className="ml-4 text-black">1</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {}}
                  id="reset"
                  className={`hidden smooth-all text-white px-3 py-1 rounded-lg bg-red-400 border-2 border-red-400/50 hover:bg-red-500 active:border-0 active:bg-red-600 active:text-white/80`}
                >
                  <i className="bx bx-reset"></i> รีเซ็ท
                </button>
              </div>
            </div>

            <div
              className={`pt-4 flex justify-between ${
                newPlanData.custom_plan_open ? 'border-b-2 pb-4' : ''
              } cursor-pointer`}
              onClick={(e: any) => {
                if (e.target.id == 'reset') return;
                setNewPlanData((prev: any) => ({ ...prev, custom_plan_open: !prev.custom_plan_open }));
              }}
            >
              <p className="text-center mb-1">กำหนดเอง</p>
              <span className="block w-12 h-6 rounded-full border-2 border-pr-blue/40 relative">
                <div
                  className={`absolute transition-all duration-150 ${
                    newPlanData.custom_plan_open ? '-translate-x-full left-full' : 'left-0'
                  } bg-pr-blue h-full aspect-square rounded-full`}
                ></div>
              </span>
            </div>
          </div> */}
          {/* TODO: thease below neiter */}
          {newPlanData.custom_plan_open && false ? (
            <>
              <div className="mt-8 relative h-10 col-span-2">
                <select
                  // ref={ref_major}
                  onChange={(e: any) => {
                    setNewPlanData((prev: any) => ({ ...prev, fac_id: e.target.value }));
                  }}
                  value={newPlanData.fac_id ? (newPlanData.fac_id as number) : 1}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  {uniFacData.map((f: any, find: number) => (
                    <option key={find} value={f.fac_id}>
                      {f['fac_name_' + 'th']}
                    </option>
                  ))}
                  {/* {getCourseSetRelation().map((c: any, cind: number) => (
            <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
          ))} */}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  คณะ
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="mt-8 relative h-10">
                  <input
                    type="number"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=""
                    value={newPlanData.std_year ? (newPlanData.std_year as number) : ''}
                    onChange={(e) => {
                      const stdy =
                        Number.parseInt(e.target.value) <= 0 || Number.parseInt(e.target.value) >= 100
                          ? 1
                          : Number.parseInt(e.target.value);
                      setNewPlanData((prev: any) => ({ ...prev, std_year: stdy }));
                    }}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    ชั้นปีที่เรียน
                  </label>
                </div>
                <div className="mt-8 relative h-10 col-span-2">
                  <select
                    // ref={ref_major}
                    onChange={(e: any) => {
                      setNewPlanData((prev: any) => ({ ...prev, cr_id: e.target.value }));
                    }}
                    value={newPlanData.cr_id ? (newPlanData.cr_id as number) : 'เลือกสาขา'}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  >
                    {getCourseSetRelation().map((c: any, cind: number) => (
                      <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
                    ))}
                    {/* {getCourseSetRelation().map((c: any, cind: number) => (
                <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
              ))} */}
                  </select>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    สาขาที่เรียน
                  </label>
                </div>
              </div>
            </>
          ) : null}

          <section className="mt-6 buttons flex justify-end">
            <button
              // disabled={step.index <= 0 || step.process != 1}
              onClick={() => {
                setNewPlanData(newPlanReset);
              }}
              // className={`smooth-all ${ step.index <= 0 || step.process != 1 ? 'opacity-50 pointer-events-none' : '' }
              className={`smooth-all 
                mt-4 text-pr-text-menu h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}
            >
              ย้อนกลับ
            </button>
            <button
              // disabled={step.process != 1}
              onClick={() => {
                handleNewPlanSend();
              }}
              className={`smooth-all mt-4 text-white h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
            >
              สร้าง
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

PlanPage.getLayout = function getLayout(page: ReactElement) {
  return <PlanPageLayout>{page}</PlanPageLayout>;
};

export default PlanPage;
