import { CalendarContext, CalendarFilterContext, ICalendarFilter } from '@/app/providers/CalendarProvider';
import { Ifilter, getCoursesByKey, getData, getUpdatedData } from '@/app/utils/subjectAPI';
import { IFloorData, IRoomData } from '@/app/utils/test-data/rooms';
import { subjectDemoData } from '@/app/utils/test-data/subjects';
import { name_days } from '@/components/PRCalendarSubject';
import { SetStateAction, useContext, useEffect, useRef, useState } from 'react';

export default function SubjectSelectorFilterModel(props: any) {
  const { children } = props;
  const { viewFilter, calsel_data, setCalselData } = useContext(CalendarContext);
  const {
    topbarToggle,
    focusTime,

    viewSchedule,

    setViewState,
    setViewFilter,
    resizePlan,
    toggleHold,
    setTopbarToggle,

    getCurrentPlan,

    uniFacGroupData,
  } = useContext(CalendarContext);

  const [filter, setFilter] = useState<ICalendarFilter>({
    group: [],
    subject: [],
    day: [],
    time: [],
    room: [],
    master: [],
  });

  const { group, subject, day, time, room, master } = filter;

  const [timeoutId, setTimeoutId] = useState<any>();
  function debounce(fn: () => void, delay: number) {
    return () => {
      clearTimeout(timeoutId);
      setTimeoutId(setTimeout(() => fn(), delay));
    };
  }

  const pinch_ref = useRef<any>(null);

  function handleOpenSubjectSelect() {
    setViewState(true);

    setViewFilter(calsel_data.isFirstLoading);

    setTimeout(() => {
      resizePlan();
    }, 250);
  }

  const [calSearch, setCalSearch] = useState(false);

  function handleReleaceHoldClick(e: any) {
    if (pinch_ref.current.sad > 5) return;
    if (topbarToggle.init) {
      if (focusTime.start_time < focusTime.end_time) {
        TimeFilterTogglePRC(
          false,
          focusTime.start_time.toString().padStart(2, '0') + ':00',
          (focusTime.end_time + 1).toString().padStart(2, '0') + ':00',
          focusTime.day,
        );
      } else {
        TimeFilterTogglePRC(
          false,
          focusTime.end_time.toString().padStart(2, '0') + ':00',
          (focusTime.start_time + 1).toString().padStart(2, '0') + ':00',
          focusTime.day,
        );
      }

      setViewState(true);

      if (calsel_data.isFirstLoading) {
        setViewFilter(true);
      } else {
        setCalSearch(true);
      }

      setTimeout(() => {
        resizePlan();
      }, 250);
    }

    clearTimeout(toggleHold);
    setTopbarToggle({ pre: false, init: false });

    pinch_ref.current.instance.setup.disabled = false;
    pinch_ref.current.instance.setup.panning.disabled = false;
  }

  useEffect(() => {
    if (calSearch) {
      handleFilterSubmit();
      setCalSearch(false);
    }
  }, [calSearch]);

  function handleFilterPanel() {
    setViewFilter(!viewFilter);
  }

  async function handleFilterSubmit(clear = false) {
    if (clear) {
      setFilter({
        group: [],
        subject: [],
        day: [],
        time: [],
        room: [],
        master: [],
      });
      return;
    }
    handleSearch();
    // setViewFilter(!viewFilter)
  }

  let abortController: any;
  let abortUpdateController: any;
  async function handleSearch() {
    let err = false;
    setCalselData({ ...calsel_data, isLoading: true, isError: false, current_filter: filter });

    // TODO:search from API
    if (abortController) {
      // If there is an ongoing request, cancel it
      abortController.abort();
    }

    abortController = new AbortController(); // Create a new AbortController instance

    try {
      // TODO: now to can use old api. i need to convert this one.
      const temp_time = filter.time.filter((t: string) => {
        if (!t.includes('-')) {
          return t;
        }
      });
      const check_filt: Ifilter = {
        firstFilter: false,
        type: filter.group,
        code: filter.subject,
        date: filter.day,
        time:
          temp_time.toString() === ''
            ? 'total'
            : temp_time
                .map((t: string) => {
                  return t.toString().split(':')[0];
                })
                .join('-'),
        master: filter.master,
      };

      // console.log(filter.group.find((f) => f.startsWith('_M-')).substring(3));
      // console.log(uniFacGroupData.);

      // console.log(getCoursesByKey(uniFacGroupData, filter.group.find((f) => f.startsWith('_M-')).substring(3)));

      const res = await getData(
        getCurrentPlan().detail.cr_year,
        getCurrentPlan().detail.cr_seamseter,
        // filter.subject.length == 0 ? '00*' : filter.subject.join('|'),
        check_filt,
        abortController.signal,
      ); // Pass the signal to the getData function

      // setSubjectShowData(res);
      // console.log(check_filt, res);

      // abortUpdateController = new AbortController(); // Create a new AbortController instance
      // await getUpdatedData(abortUpdateController.signal).then(res2=> {

      //   if (abortUpdateController) {
      //     // If there is an ongoing request, cancel it
      //     abortUpdateController.abort();
      //   }
      //   setCalselData({...calsel_data, isLoading: false, isFirstLoading: false, updated: res2, result: {recommand:[], data: res}})
      //   // setSubjectUpdatedData(res);
      // });
      // TODO: re-make updated status and remove 1 below line
      setCalData({ recommand: [], data: res });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Request was aborted, handle cancellation as needed
        console.log('Request was cancelled.');
        return;
      }

      // Handle other errors
      console.error('An error occurred:', error);
      err = true;
      setCalData({ recommand: [], data: [] }, true);
    } finally {
      // toggleDataLoaded(true);
      abortController = null; // Reset the abortController variable
    }

    // setTimeout(()=>{
    //   setCalselData({...calsel_data, isLoading: false, isFirstLoading: false, result: {recommand:[], data:[...subjectDemoData]}})
    // },1000)
  }

  function setCalData(list: any, error = false) {
    setCalselData({ ...calsel_data, isLoading: false, isFirstLoading: false, isError: error, result: list });
  }

  function fnHandleClickedOnCalendar(tindex: number, dindex: number) {
    // console.log('test', pinch_ref.current.sad);
    if (viewSchedule) {
      setViewState(false);
      setViewFilter(false);
    } else {
      if (pinch_ref.current.sad > 5) return;
      if (tindex >= 0) SingleTimeFilterTogglePRC((8 + tindex).toString().padStart(2, '0') + ':00', true, dindex);
      setViewState(true);

      if (calsel_data.isFirstLoading) {
        setViewFilter(true);
      } else {
        setCalSearch(true);
      }
    }
    setTimeout(() => {
      resizePlan();
    }, 250);
  }

  function isGroupFilterOn(name: string = '') {
    return group.includes(name);
  }

  function GroupFilterTogglePRC(name: string, majorgroup = false) {
    let temp_group = group;

    if (majorgroup) {
      temp_group = group.filter((item: string) => !item.startsWith('_M-'));
    }

    if (group.includes(name)) {
      temp_group = group.filter((item: string) => item !== name);
    } else {
      temp_group.push(name);
    }

    setFilter({ ...filter, group: temp_group });
  }

  function getGroupMajorFilterNamePRC(majorgroup = false) {
    return group.find((item: string) => item.startsWith('_M-'))?.substring(3) || 'เลือกสาขา';
  }

  function isDayFilterOn(name: string = '') {
    return day.includes(name);
  }

  function DayFilterTogglePRC(name: string) {
    let temp_day = day;

    if (day.includes(name)) {
      temp_day = day.filter((item: string) => item !== name);
    } else {
      temp_day.push(name);
    }

    setFilter({ ...filter, day: temp_day });
  }

  function isTimeFilterOn(all: boolean = false, time_num: string = '') {
    if (all) {
      return (
        time.length == 0 ||
        (time.length > 0 && time.includes('total')) ||
        time.filter((t: string) => t === t.replaceAll('-', '')).length == 0
      );
    }

    return time.includes('total') ? false : time.filter((t: string) => t === time_num.replaceAll('-', '')).length > 0;
  }

  function isSubjectFilterOn(code: string = '') {
    return subject.includes(code);
  }

  function isMasterFilterOn(name: string = '') {
    return master.includes(name);
  }

  function isRoomFilterOn(name: string = '', place = '', floor = -1) {
    return room.includes(name) || room.includes(place) || room.includes(`${place}-${floor}`);
  }

  function TimeFilterTogglePRC(
    all: boolean = false,
    time_start: string = '',
    time_stop: string = '',
    dindex: number = -1,
  ) {
    let temp_time = filter.time;
    if (all) {
      if (!temp_time.includes('total')) {
        temp_time = temp_time.map((t: string) => (t === t.replaceAll('-', '') ? '-' + t : t));
        temp_time.push('total');
      }
    } else if (time_start !== '' && time_stop !== '') {
      temp_time = [time_start, time_stop];
    } else if (time_start !== '') {
      temp_time = [time_start];
    } else {
      temp_time = [];
    }

    // day select
    if (dindex != -1) {
      setFilter({ ...filter, time: temp_time, day: [name_days[dindex].date_en_2] });
    } else {
      setFilter({ ...filter, time: temp_time });
    }
  }
  function SingleTimeFilterTogglePRC(time_num: string = '', forceToggle = false, dindex: number = -1) {
    let temp_time = filter.time;

    if (!filter.time.includes(time_num) || forceToggle) {
      temp_time = [time_num];
    } else {
      temp_time = temp_time.filter((t: string) => t !== 'total');

      temp_time = temp_time.map((tt: string) => {
        if (tt === time_num) {
          return time_num.includes('-') ? tt.slice(1) : '-' + tt;
        }
        return tt;
      });
    }

    // day select
    if (dindex != -1) {
      setFilter({ ...filter, time: temp_time, day: [name_days[dindex].date_en_2] });
    } else {
      setFilter({ ...filter, time: temp_time });
    }
  }

  function SubjectFilterTogglePRC(code: string) {
    let temp = filter.subject;
    if (isSubjectFilterOn(code)) {
      temp = temp.filter((s: string) => s !== code);
    } else {
      temp.push(code);
    }

    setFilter({ ...filter, subject: temp });
  }
  function MasterFilterTogglePRC(name: string) {
    let temp = filter.master;
    if (isMasterFilterOn(name)) {
      temp = temp.filter((s: string) => s !== name);
    } else {
      temp.push(name);
    }

    setFilter({ ...filter, master: temp });
  }
  function FloorFilterTogglePRC(name: string, floor: number) {
    let temp = filter.room;
    if (floor === undefined) {
      temp = temp.filter((s: string) => s !== name);
    } else {
      const tag_name = `${name}-${floor}`;
      if (isRoomFilterOn(name, name, floor)) {
        if (temp.some((t: string) => t === name)) {
          temp = temp.filter((s: string) => s !== name);
          temp.push(tag_name);
        } else {
          temp = temp.filter((s: string) => s !== tag_name);
        }
      } else {
        temp.push(tag_name);
      }
    }

    setFilter({ ...filter, room: temp });
  }
  function getFloorAmountInPlace(place: IRoomData): number {
    return place.floors.length;
  }
  function getFloorToggledInPlace(place: IRoomData): number {
    let temp = 0;
    if (filter.room.includes(place.place)) {
      return place.floors.length;
    } else {
      place.floors.map((r: IFloorData) => {
        if (filter.room.includes(`${place.place}-${r.floor}`)) {
          temp = temp + 1;
        }
      });
    }
    return temp;
  }
  function AllFloorFilterTogglePRC(name: string) {
    let temp = filter.room;

    temp = temp.filter((t: string) => !t.includes(name));

    if (isRoomFilterOn(name)) {
      temp = temp.filter((s: string) => s !== name);
    } else {
      temp.push(name);
    }

    setFilter({ ...filter, room: temp });
  }

  // in-panel filter
  const [subjectViewFilter, setSubjectViewFilter] = useState(false);
  const [roomViewFilter, setRoomViewFilter] = useState(false);
  const [masterViewFilter, setMasterViewFilter] = useState(false);
  const [majorViewFilter, setMajorViewFilter] = useState(false);
  const [timeSetViewFilter, setTimeSetViewFilter] = useState(false);
  const [filterDebounceProgress, setFilterDebounceProgress] = useState(0);
  const [filterDebounceProgressFunc, setFilterDebounceProgressFunc] = useState<any>();

  function handleSubjectFilterSubmit() {
    setSubjectViewFilter(false);
  }
  function resetSubjectViewFilter() {
    setFilter({ ...filter, subject: [] });
  }
  function handleMasterFilterSubmit() {
    setMasterViewFilter(false);
  }
  function resetMasterViewFilter() {
    setFilter({ ...filter, master: [] });
  }
  function handleRoomFilterSubmit() {
    setMasterViewFilter(false);
  }
  function resetRoomViewFilter() {
    setFilter({ ...filter, room: [] });
  }
  function handleMajorViewFilter() {
    setMajorViewFilter(false);
  }
  function handleTimeSetViewFilter() {
    setTimeSetViewFilter(false);
  }
  function resetMajorViewFilter() {
    setFilter({ ...filter, group: [] });
  }

  function handleFilterOnSubmit(funcRun: () => void) {
    setFilterDebounceProgress(0);
    clearInterval(filterDebounceProgressFunc);
    const debouncedFunction = debounce(() => {
      setFilterDebounceProgressFunc(() => {
        let a = setInterval(() => {
          setFilterDebounceProgress((prev) => {
            if (prev >= 100) {
              funcRun();
              clearInterval(a);
              return 0;
            }
            return prev + 25;
          });
        }, 100);
        return a;
      });
    }, 500);
    debouncedFunction();
  }

  return (
    <CalendarFilterContext.Provider
      value={{
        fnHandleClickedOnCalendar,
        handleReleaceHoldClick,
        handleFilterPanel,
        handleFilterSubmit,
        handleOpenSubjectSelect,
        filter,
        setFilter,
        isGroupFilterOn,
        isDayFilterOn,
        isTimeFilterOn,
        isSubjectFilterOn,
        isMasterFilterOn,
        isRoomFilterOn,
        GroupFilterTogglePRC,
        getGroupMajorFilterNamePRC,
        DayFilterTogglePRC,
        TimeFilterTogglePRC,
        SingleTimeFilterTogglePRC,
        SubjectFilterTogglePRC,
        MasterFilterTogglePRC,
        FloorFilterTogglePRC,
        AllFloorFilterTogglePRC,
        subjectViewFilter,
        setSubjectViewFilter,
        roomViewFilter,
        setRoomViewFilter,
        masterViewFilter,
        majorViewFilter,
        setMajorViewFilter,
        setMasterViewFilter,
        getFloorAmountInPlace,
        getFloorToggledInPlace,
        filterDebounceProgress,
        handleSubjectFilterSubmit,
        handleMasterFilterSubmit,
        handleRoomFilterSubmit,
        handleFilterOnSubmit,
        resetSubjectViewFilter,
        resetMasterViewFilter,
        resetRoomViewFilter,
        handleMajorViewFilter,
        resetMajorViewFilter,
        timeSetViewFilter,
        setTimeSetViewFilter,
        handleTimeSetViewFilter,
        pinch_ref,
      }}
    >
      <div
        className={'bg-pr-bg dark:bg-pr-bg-3 pr-layout h-[100dvh] grid grid-rows-[auto_1fr] ' + props.classname}
        onMouseUp={handleReleaceHoldClick}
      >
        {children}
      </div>
    </CalendarFilterContext.Provider>
  );
}
