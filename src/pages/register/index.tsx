import PlainPageLayout from '@/app/layout/plainlayout';
import { getUniversityData, getUniversityListData } from '@/app/utils/universityAPI';
import { Player } from '@lottiefiles/react-lottie-player';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PasswordValidator from 'password-validator';
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { PatternFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import AvatarEditor from 'react-avatar-editor';
import { Position } from 'postcss';
import uploadImageToImgbb from '@/app/utils/imgbb';
import { encryptPassword } from '@/app/utils/userAPI';

type IRegsterStepData = {
  uni_id: Number;
  username: String;
  email: String;
  phone?: String;
  img?: String;
  password: string;
  passwordc: string;
  std_name: string;
  std_surname: string;
  fac_id?: Number;
  major_id?: Number;
  cr_id?: Number;
  std_lvl?: Number;
  std_year?: Number;
  std_id: string;
};

function RegisterPage(props: any) {
  const { data: session, status: session_status, update } = useSession();
  const redirect = useRouter();

  if (session_status == 'authenticated') {
    redirect.push({ pathname: '/plan' });
  }

  async function updateSession() {
    let imgUploaded = '';
    if (imgState.preview != undefined) {
      const res = await uploadImageToImgbb(imgState?.preview?.img as string);
      imgUploaded = res.data.thumb.url;
    }
    const bd = {
      uni_id: firstStepData.uni_id,
      fac_id: firstStepData.fac_id,
      major_id: firstStepData.major_id,
      std_id: firstStepData.std_id.length == 11 ? firstStepData.std_id : '',
      cr_id: firstStepData.cr_id,
      std_start_year: new Date(Date.now()).getFullYear() + 543 - (firstStepData.std_year || 0).valueOf(),
      username: firstStepData.username,
      password: encryptPassword(firstStepData.password),
      email: firstStepData.email,
      image: imgUploaded,
      std_name: firstStepData.std_name,
      std_surname: firstStepData.std_surname,
      phone: firstStepData.phone,
      auth_reg_username: firstStepData.std_id.length == 11 ? firstStepData.std_id.length : '',
    };

    // console.log(bd);
    // console.log(JSON.stringify(bd));
    // TODO: register not send body throught api
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bd),
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
      toast.error('เกิดข้อผิดพลาด');
      console.log('error:', res.status, res);
      return;
    }

    toast.success('สมัครสมาชิกเรียบร้อย');

    const result = await signIn('planriean', {
      redirect: false,
      username: firstStepData.username,
      password: encryptPassword(firstStepData.password),
    });
    if (result?.ok) {
      redirect.push({ pathname: '/plan' });
    }
  }

  const animationURL = '/assets/lotties/loading.json';

  const [step, setStep] = useState({ index: 0, process: 0, pre_process: 1 });

  const [firstStepData, setFirstStepData] = useState<IRegsterStepData>({
    uni_id: 1,
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordc: '',
    std_name: '',
    std_surname: '',
    std_year: 1,
    std_id: '',
    std_lvl: 1,
    cr_id: -1,
    fac_id: 1,
  });
  function getStudentEducatedYear(e: string) {
    const val =
      e.substring(0, 2) != ''
        ? new Date(Date.now()).getFullYear() + 543 - Number.parseInt(25 + e.substring(0, 2))
        : (firstStepData.std_year as number) || 1;
    return val <= 0 ? 1 : val;
  }
  function checkFromStudentId(value = 'null') {
    const e = value != 'null' ? value : firstStepData.std_id;
    const std_year = value != 'null' ? getStudentEducatedYear(e) : firstStepData.std_year;
    const fac_id = value != 'null' ? Number.parseInt(e.substring(4, 6)) : firstStepData.fac_id;
    const std_lvl = value != 'null' ? Number.parseInt(e.substring(6, 7)) : firstStepData.std_lvl;
    setFirstStepData({ ...firstStepData, std_id: e, std_year, fac_id, std_lvl });
  }

  const [uniData, setUniData] = useState<any>([]);
  const [uniFacData, setUniFacData] = useState<any>([]);

  useEffect(() => {
    getUniversityListData(null).then((uni_list) => {
      const uni: any = [];
      uni_list.data.map((d: any, index: number) => {
        if (d.enabled) {
          uni.push(
            <span
              key={index}
              onClick={() => {
                setFirstStepData({ ...firstStepData, uni_id: d.uni_id });
              }}
              className={`smooth-all bg-white px-2 py-2 mt-5 border w-full rounded-xl
                            flex pl-6 gap-4 items-center text-sm duration-300 text-pr-blue-dark ${
                              firstStepData.uni_id == d.uni_id ? 'border-2 border-pr-msu-1' : ''
                            }`}
            >
              {d.uni_logo ? <Image src={d.uni_logo} width={30} height={30} alt="Google Logo" /> : null}
              <span className="px-2">{d['uni_name_' + 'th']}</span>
            </span>,
          );
        }
      });
      setUniData(uni);
    });
  }, []);

  useEffect(() => {
    getUniversityData(firstStepData.uni_id, false, null).then((fac_list: any) => {
      const fac: any = [];
      // console.log(fac_list.facultys)
      setUniFacData(fac_list.facultys);
    });
  }, [firstStepData.uni_id]);

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
  function getCourseSetRelation(): Array<any> {
    // if(!firstStepData.fac_id) return []

    const same_year =
      getStudentEducatedYear(firstStepData.std_id) ==
      (Number.isNaN(firstStepData.std_year) ? 1 : firstStepData.std_year);
    const coursesets = uniFacData.find((f: any) => f.fac_id == firstStepData.fac_id)?.coursesets[0].children || [];
    const std_year =
      firstStepData.std_id != ''
        ? Number.parseInt(firstStepData.std_id.substring(0, 2)) +
          (!same_year
            ? getStudentEducatedYear(firstStepData.std_id) -
              (((Number.isNaN(firstStepData.std_year) ? 1 : firstStepData.std_year) as number) || 0)
            : 0)
        : new Date(Date.now()).getFullYear() + 543 - 2500 - getStudentEducatedYear(firstStepData.std_id);

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

    const uniqueMaxSubResult = filterUniqueMaxSub(res_lower);
    // console.log(uniqueMaxSubResult);
    return uniqueMaxSubResult;
  }

  const ref_fac = useRef<any>();
  const ref_major = useRef<any>();

  const [pwdC, setPwdC] = useState<any>([]);

  function handlePasswordCheck(pass: any) {
    var schema = new PasswordValidator();
    schema
      .is()
      .min(8, 'รหัสผ่านต้องยาวไม่น้อยกว่า 8 ตัวอักษร') // Minimum length 8
      .is()
      .max(100, 'รหัสผ่านต้องยาวไม่เกิน 100 ตัวอักษร') // Maximum length 100
      .has()
      .uppercase(1, 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัวอักษร') // Must have uppercase letters
      .has()
      .not()
      .spaces(1, 'รหัสผ่านต้องไม่มีเว้นวรรค'); // Should not have spaces

    // Get a full list of rules which failed
    let t = schema.validate(pass ? pass : firstStepData.password, { details: true, list: true });
    setPwdC(t);
  }

  type ImgState = {
    image: string | File;
    allowZoomOut: boolean;
    position: any;
    scale: number;
    rotate: number;
    borderRadius: number;
    preview?: {
      img: string;
      rect: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      scale: number;
      width: number;
      height: number;
      borderRadius: number;
    };
    width: number;
    height: number;
    disableCanvasRotation: boolean;
    isTransparent: boolean;
    backgroundColor?: string;
    showGrid: boolean;
  };
  const [editState, setEditState] = useState(false);
  const editor = useRef<any>(null);
  const [imgState, setImgState] = useState<ImgState>({
    image: '/assets/images/prof.jpg',
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: undefined,
    width: 280,
    height: 280,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: undefined,
    showGrid: false,
  });

  const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImgState({ ...imgState, image: e.target.files[0] });

      setEditState(true);
    }
  };

  const handleSave = () => {
    const img = editor.current?.getImageScaledToCanvas().toDataURL();
    const rect = editor.current?.getCroppingRect();

    if (!img || !rect) return;

    setImgState({
      ...imgState,
      preview: {
        img,
        rect,
        scale: imgState.scale,
        width: imgState.width,
        height: imgState.height,
        borderRadius: imgState.borderRadius,
      },
    });
  };
  const handlePositionChange = (position: Position) => {
    setImgState({ ...imgState, position });
  };

  const stepContent = [
    {
      step: 0,
      title: 'user info',
      content: (
        <>
          <h2 className="text-lg font-medium text-pr-blue">ยินดีต้อนรับ</h2>
          <h2 className="">มาเป็นครอบครัวแพลนเรียนได้ในไม่กี่ขั้นตอน</h2>
          <div className="relative text-sm flex flex-col gap-4 mt-4">
            <input
              type="text"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={firstStepData.username ? (firstStepData.username as string) : ''}
              onChange={(e) => {
                setFirstStepData({ ...firstStepData, username: e.target.value.toLowerCase() });
              }}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              ชื่อผู้ใช้
            </label>
          </div>
          <div className="relative text-sm flex flex-col gap-4 mt-4">
            <input
              type="email"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={firstStepData.email ? (firstStepData.email as string) : ''}
              onChange={(e) => {
                setFirstStepData((prev: any) => {
                  const email = e.target.value.toLowerCase();
                  return { ...prev, email };
                });
              }}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              อีเมล
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative text-sm flex flex-col gap-4 mt-4">
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                value={firstStepData.std_name ? (firstStepData.std_name as string) : ''}
                onChange={(e) => {
                  setFirstStepData({ ...firstStepData, std_name: e.target.value.trim() });
                }}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                ชื่อจริง
              </label>
            </div>
            <div className="relative text-sm flex flex-col gap-4 mt-4">
              <input
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                value={firstStepData.std_surname ? (firstStepData.std_surname as string) : ''}
                onChange={(e) => {
                  setFirstStepData({ ...firstStepData, std_surname: e.target.value.trim() });
                }}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                นามสกุล
              </label>
            </div>
          </div>
          <div className="mt-12 relative">
            <input
              type="password"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={firstStepData.password ? (firstStepData.password as string) : ''}
              onChange={(e) => {
                setFirstStepData((prev: any) => {
                  handlePasswordCheck(e.target.value);
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              กรอกรหัสผ่าน
            </label>
          </div>
          <div className="mt-4 relative">
            <input
              type="password"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={firstStepData.passwordc ? (firstStepData.passwordc as string) : ''}
              onChange={(e) => {
                setFirstStepData((prev: any) => ({ ...prev, passwordc: e.target.value }));
              }}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              ยืนยันรหัสผ่าน
            </label>
          </div>
          <div className="mt-4 relative">
            {firstStepData.password.trim() != '' &&
              pwdC.map((p: any, pind: number) => (
                <div key={pind} className="border border-red-400 bg-red-50 text-red-600 p-2 m-2 text-xs rounded-md">
                  {p.message}
                </div>
              ))}
            {firstStepData.passwordc.trim() != '' && firstStepData.password !== firstStepData.passwordc ? (
              <div className="border border-red-400 bg-red-50 text-red-600 p-2 m-2 text-xs rounded-md">
                รหัสผ่านไม่ตรงกัน
              </div>
            ) : null}
          </div>
        </>
      ),
      check: () => {
        if (firstStepData.username.trim() == '') {
          toast.error('โปรดกรอกชื่อผู้ใช้งาน');
          return false;
        }
        if (firstStepData.email.trim() == '') {
          toast.error('โปรดกรอกอีเมล');
          return false;
        }
        if (firstStepData.password.trim() == '') {
          toast.error('โปรดกรอกรหัสผ่าน');
          return false;
        }
        if (firstStepData.password !== firstStepData.passwordc) {
          toast.error('รหัสผ่านไม่ตรงกัน');
          return false;
        }

        // setFirstStepData({...firstStepData, cr_id: ref_major.current.value, fac_id: ref_fac.current.value})

        return true;
      },
      error: () => {},
    },
    {
      step: 1,
      title: 'test',
      content: (
        <>
          <h2 className="text-lg font-medium text-pr-blue">ข้อมูลชีวิตในรั้วมหาวิทยาลัย... ให้เราช่วยกรอกได้นะ</h2>
          <h2 className="">ใส่รหัสนิสิตของคุณลงมาสิ</h2>
          <div className="text-sm flex flex-col gap-4 mt-4">
            <PatternFormat
              format="###########"
              value={firstStepData.std_id}
              onValueChange={(values) => {
                checkFromStudentId(values.value);
              }}
              className="px-3.5 py-2.5 pb-2 rounded-[7px] border"
              placeholder="6701121***"
              valueIsNumericString={true}
            />
            {/* <input
                    type="username"
                    className="p-2 rounded-xl border"
                    placeholder="ชื่อผู้ใช้ ที่คุณอยากไช้"
                    /> */}
          </div>
          <div className="mt-12 relative h-10">
            <select
              ref={ref_fac}
              onChange={(e: any) => {
                setFirstStepData({ ...firstStepData, fac_id: e.target.value });
              }}
              value={firstStepData.fac_id ? (firstStepData.fac_id as number) : 1}
              className={`peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
            >
              {uniFacData.map((f: any, find: number) => (
                <option key={find} value={f.fac_id}>
                  {f['fac_name_' + 'th']}
                </option>
              ))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              คณะของคุณ
            </label>
          </div>
          <div className="grid grid-cols-[7em_auto] gap-4">
            <div className="mt-8 relative h-10">
              <input
                type="number"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                value={firstStepData.std_year ? (firstStepData.std_year as number) : ''}
                onChange={(e) => {
                  const stdy =
                    Number.parseInt(e.target.value) <= 0 || Number.parseInt(e.target.value) >= 100
                      ? 1
                      : Number.parseInt(e.target.value);
                  setFirstStepData({ ...firstStepData, std_year: stdy });
                }}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                คุณอยู่ปีไหน
              </label>
            </div>
            <div className="mt-8 relative h-10">
              <select
                ref={ref_major}
                onChange={(e: any) => {
                  setFirstStepData({ ...firstStepData, cr_id: e.target.value });
                }}
                value={firstStepData.cr_id ? (firstStepData.cr_id as number) : 'เลือกสาขา'}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm pb-1 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {/* <option value="-1">{`เลือกสาขา`}</option> */}
                {getCourseSetRelation().map((c: any, cind: number) => (
                  <option key={cind} value={c.cr_id}>{`${c.cr_key} - ${c['name_' + 'th']}`}</option>
                ))}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                สาขาที่ศึกษา
              </label>
            </div>
          </div>
        </>
      ),
      check: () => {
        if (ref_major.current.value == '') {
          toast.error('เลือกสาขาที่เรียนก่อน');
          return false;
        }

        setFirstStepData({ ...firstStepData, cr_id: ref_major.current.value, fac_id: ref_fac.current.value });

        return true;
      },
      error: () => {},
    },
    {
      step: 2,
      title: 'test',
      content: (
        <>
          <h2 className="-mt-14 text-2xl text-center font-medium text-pr-blue">อยากเปลี่ยนรูปมั้ย</h2>
          <div className="flex flex-col items-center justify-center mt-4 md:mt-10">
            <div className="relative rounded-full overflow-hidden">
              <img
                src={imgState?.preview != undefined ? imgState?.preview?.img : (imgState.image as string)}
                onError={(e) => {
                  e.preventDefault();
                  setFirstStepData({ ...firstStepData, img: '/assets/images/prof.jpg' });
                }}
                alt={`${firstStepData.std_name || 'Planriean'}'s Profile`}
                width={150}
                height={150}
                className="rounded-full aspect-square object-cover border-2 border-white/30 drop-shadow-xl"
              ></img>
              <button
                onClick={() => {
                  setEditState(true);
                }}
                className="text-white absolute h-full w-full top-0 bg-black/40 backdrop-blur-sm opacity-0 group hover:opacity-100 smooth-all"
              >
                <i className="bx bx-edit text-5xl"></i>
                <p className="text-xs">แก้ไขรูปภาพ</p>
              </button>
            </div>
            <input id="profile" type="file" onChange={handleNewImage} hidden />
            <label
              htmlFor="profile"
              className={`cursor-pointer smooth-all flex gap-2 items-center mt-4 text-white h-10 px-3 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
            >
              <i className="bx bx-image-add"></i> อัพโหลดภาพ
            </label>
            <h3 className="text-xl font-medium mt-4 md:mt-10">
              {firstStepData.std_name + ' ' + firstStepData.std_surname || 'User'}
            </h3>
            <h3 className="mt-2">
              {uniFacData.find((f: any) => f.fac_id == firstStepData.fac_id) != null
                ? uniFacData.find((f: any) => f.fac_id == firstStepData.fac_id)['fac_name_' + 'th']
                : ''}
            </h3>
            <h3 className="">
              สาขา
              {getCourseSetRelation().find((c: any) => c.cr_id == firstStepData.cr_id) != null
                ? getCourseSetRelation().find((c: any) => c.cr_id == firstStepData.cr_id)['name_' + 'th']
                : ''}
            </h3>
          </div>
          {step.index == 2 ? (
            <div
              className={`fixed bg-black/30 backdrop-blur-sm w-full h-full left-0 top-0 flex justify-center items-center transition-all duration-300 ${
                !editState ? 'opacity-0 invisible' : ''
              }`}
            >
              <div className={`rounded-xl drop-shadow-xl overflow-hidden relative bg-white`}>
                <div className="flex justify-between items-end">
                  <h2 className="ml-4 text-xl text-center font-medium text-pr-blue">อัพโหลดภาพ</h2>
                  <button
                    className="flex items-center p-4"
                    onClick={() => {
                      setEditState(false);
                    }}
                  >
                    <i className="bx bx-x text-2xl text-black/50"></i>
                  </button>
                </div>
                {editState ? (
                  <AvatarEditor
                    ref={editor}
                    borderRadius={500}
                    color={[255, 255, 255, 1]}
                    position={imgState.position}
                    image={imgState.image}
                    width={imgState.width}
                    height={imgState.height}
                    scale={imgState.scale}
                    onPositionChange={handlePositionChange}
                  />
                ) : null}
                <div className="">
                  <div className="relative px-6">
                    <p className="text-xs">ขนาดภาพ</p>
                    <input
                      id="size-range"
                      type="range"
                      value={imgState.scale}
                      onChange={(e) => {
                        setImgState({ ...imgState, scale: Number.parseFloat(e.target.value) });
                      }}
                      min="1"
                      step="0.01"
                      max="3"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
                <div className="flex justify-end pb-4 pr-3">
                  <input id="profile" type="file" onChange={handleNewImage} hidden />
                  <label
                    htmlFor="profile"
                    className={`cursor-pointer smooth-all flex gap-1 justify-center items-center mt-4 text-pr-text-menu h-10 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}
                  >
                    <i className="bx bx-image-add"></i> เลือกรูปใหม่
                  </label>
                  {/* <button onClick={()=>{}} className={`smooth-all mt-4 text-pr-text-menu h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}>
                                เลือกรูปใหม่
                            </button> */}
                  <button
                    onClick={() => {
                      handleSave();
                      setEditState(false);
                    }}
                    className={`smooth-all mt-4 text-white h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
                  >
                    ใช้รูปนี้
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ),
      check: () => {
        confirmAccount();
        return true;
      },
      error: () => {},
    },
  ];
  useEffect(() => {
    if (step.process == 0) {
      setTimeout(() => {
        setStep({ ...step, process: 1 });
      }, 30);
    } else if (step.process == 2) {
      setTimeout(() => {
        setStep({ index: step.index + 1, process: 0, pre_process: 1 });
      }, 300);
    } else if (step.process == 3) {
      setTimeout(() => {
        setStep({ index: step.index - 1, process: 0, pre_process: -1 });
      }, 300);
    }
  }, [step]);

  function handleNextStep() {
    if (!stepContent[step.index].check()) {
      stepContent[step.index].error();
      return;
    }
    if (step.index + 1 >= stepContent.length) return;
    setStep({ ...step, process: 2 });
  }
  function handleBackStep() {
    if (step.index <= 0) return;
    setStep({ ...step, process: 3 });
  }

  const [redir, setRedir] = useState(false);
  function confirmAccount() {
    // setRedir(true);
    updateSession();
  }

  return (
    <>
      <Head>
        <title>สมัครสมาชิก : Planriean</title>
      </Head>
      {/* loading overlay */}
      <div
        className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${
          session_status != 'loading' && !redir ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <div className="box text-pr-blue text-center">
          <Player src={animationURL} autoplay loop speed={1} style={{ height: 100 }} />
          Loading
        </div>
      </div>

      {/* process section */}
      <section className="container mx-auto px-4 h-full relative">
        <div className="flex flex-col justify-between h-full">
          <div className="relative">
            <h2
              className={`smooth-all mt-4 font-bold text-2xl text-pr-blue ${
                step.index + 1 == stepContent.length ? 'opacity-0' : 'opacity-100'
              }`}
            >
              สมัครสมาชิก
            </h2>
            <h2
              className={`smooth-all text-lg text-pr-blue ${
                step.index + 1 == stepContent.length ? 'opacity-0' : 'opacity-100'
              }`}
            >
              เป็นหนึ่งในครอบครัวแพลนเรียน
            </h2>
            <div
              className={`smooth-all h-10 w-10 absolute right-0 top-2 flex justify-center items-center ${
                step.index + 1 == stepContent.length ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className={` absolute mt-1 font-bold text-md text-pr-blue`}>{step.index + 1}</p>
              <CircularProgressbar
                value={step.index + 1}
                strokeWidth={15}
                maxValue={stepContent.length}
                styles={buildStyles({
                  // Text size
                  textSize: '16px',

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Colors
                  pathColor: `#0075F7`,
                  textColor: '#f88',
                  trailColor: '#CACFD9',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>
          </div>
          <div className="content-step px-4 my-4">
            <div
              className={` ${step.process == 0 ? '' : 'transition-all duration-300'} ${
                (step.process == 0 && step.pre_process == 1) || step.process == 3
                  ? '-translate-x-4 opacity-0'
                  : (step.process == 0 && step.pre_process == -1) || step.process == 2
                  ? 'translate-x-4 opacity-0'
                  : ''
              }`}
            >
              {stepContent[step.index].content}
            </div>
          </div>
          <section className="buttons pb-6 flex max-md:flex-col justify-between items-end">
            <div className="mb-2 text-xs flex gap-4">
              <p className="text-gray-400">เป็นสมาชิกอยู่แล้วเหรอ?</p>
              <Link
                href={{ pathname: '/login', query: { fallbackUrl: redirect.query.fallbackUrl } }}
                className="text-pr-blue"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
            <div className="">
              <button
                disabled={step.index <= 0 || step.process != 1}
                onClick={() => {
                  handleBackStep();
                }}
                className={`smooth-all ${
                  step.index <= 0 || step.process != 1 ? 'opacity-50 pointer-events-none' : ''
                } mt-4 text-pr-text-menu h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}
              >
                ย้อนกลับ
              </button>
              <button
                disabled={step.process != 1}
                onClick={() => {
                  handleNextStep();
                }}
                className={`smooth-all ${
                  step.process != 1 ? 'opacity-50 pointer-events-none' : ''
                } mt-4 text-white h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
              >
                {step.index + 1 >= stepContent.length ? 'เสร็จสิ้น' : 'ถัดไป'}
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <PlainPageLayout>{page}</PlainPageLayout>;
};

export default RegisterPage;
