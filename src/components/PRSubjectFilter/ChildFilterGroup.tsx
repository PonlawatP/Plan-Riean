import { useEffect, useState } from 'react';
import SubjectObject from './SubjectObject';
import Image from 'next/image';

export default function ChildFilterGroup(props: any) {
  const {
    title = 'title',
    desc = 'desc',
    className = '',
    bigCollapse = false,
    checkbox,
    img,
    onCheckedClick = (e: string) => {},
    subDesc = 'subdesc',
    checkedAllText = 'text',
    checked = false,
    checkedAll = false,
    toggle = false,
  } = props;
  const [_toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(toggle);
  }, [toggle]);

  function handleToggle() {
    setToggle(!_toggle);
  }
  return (
    <>
      <div className={`sticky top-0 ${bigCollapse ? 'p-1 bg-white' : ` ${!_toggle ? '' : ''}`}`}>
        <div className={`${bigCollapse ? '' : ''}`}>
          <button
            onClick={() => handleToggle()}
            className={`group ${
              bigCollapse
                ? `py-4 shadow-lg ${
                    _toggle ? 'bg-pr-bg hover:bg-white' : 'bg-white hover:bg-pr-bg'
                  }  border-b-4 border-pr-blue rounded-lg`
                : 'py-2 fade-y bg-white'
            } px-5 text-left w-full flex justify-between items-center ${className}`}
          >
            {/* <button
          onClick={() => handleToggle()}
          className={`fade-y group  ${bigCollapse ? 'py-4' : 'py-2'} px-5 text-left w-full flex ${
            bigCollapse ? 'justify-center' : 'justify-between'
          } items-center bg-white ${_toggle ? '' : ''} ${className}`}
        > */}
            {img ? (
              <div
                className={`absolute smooth-all ${!_toggle ? '-left-1' : 'left-0'} w-40 h-full overflow-hidden -z-10`}
              >
                <span className="block w-full h-full absolute bg-gradient-to-l from-white to-transparent to-60%"></span>
                <Image
                  className="w-full h-full object-cover"
                  alt={title + '_' + desc}
                  src={img}
                  width={100}
                  height={100}
                  loading="lazy"
                ></Image>
              </div>
            ) : null}
            <span
              className={`block absolute w-full h-full left-0 ${
                !bigCollapse ? 'group-hover:bg-black/10 group-active:bg-slate-600/30' : ''
              } -z-10`}
            ></span>
            <div className="flex items-center">
              {checkbox ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckedClick(title);
                  }}
                  className="smooth-all relative drop-shadow-pr-shadow-text flex justify-center rounded-md bg-white group/select hover:p-1 hover:rounded-r-none hover:rounded-l-lg mr-[6.5rem]"
                >
                  {checkedAll ? (
                    <>
                      <i
                        className={`text-pr-gray-1 bx bx-checkbox-checked text-xl smooth-all group-hover/select:opacity-0`}
                      ></i>
                      <i
                        className={`text-pr-gray-1 bx bxs-checkbox-checked text-xl smooth-all absolute opacity-0 group-hover/select:opacity-100`}
                      ></i>
                    </>
                  ) : checked ? (
                    <>
                      <i
                        className={`text-pr-gray-1 bx bx-checkbox-minus text-xl smooth-all group-hover/select:opacity-0`}
                      ></i>
                      <i
                        className={`text-pr-gray-1 bx bxs-checkbox-minus text-xl smooth-all absolute opacity-0 group-hover/select:opacity-100`}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i
                        className={`text-pr-gray-1 bx bx-checkbox text-xl smooth-all group-hover/select:opacity-0`}
                      ></i>
                      <i
                        className={`text-pr-gray-1 bx bxs-checkbox text-xl smooth-all absolute opacity-0 group-hover/select:opacity-100`}
                      ></i>
                    </>
                  )}
                  <span className="-z-10 smooth-all absolute px-5 group-hover/select:px-2 group-hover/select:py-1 rounded-r-md bg-white opacity-0 group-hover/select:opacity-100 left-0 group-hover/select:left-[98%] top-0 w-max text-sm text-pr-gray-1">
                    {checkedAllText}
                  </span>
                </span>
              ) : null}
              <div className={`smooth-all ${img ? (_toggle ? 'translate-x-4' : 'group-hover:translate-x-1') : ''}`}>
                {title !== 'title' ? <h1 className="font-bold">{title}</h1> : null}
                {desc !== 'desc' ? <p className="">{desc}</p> : null}
              </div>
            </div>
            {/* {bigCollapse ? null : ( */}
            <span className={`flex items-center ${bigCollapse ? 'absolute right-5' : ''}`}>
              {subDesc !== 'subdesc' ? (
                <p className="absolute w-14 text-right right-12 text-sm text-pr-gray-2">{subDesc}</p>
              ) : null}
              <i className={`bx bx-chevron-down text-2xl smooth-all ${_toggle ? 'rotate-180' : ''}`}></i>
            </span>
            {/* )} */}
          </button>
        </div>
      </div>

      {_toggle ? props.children : null}
    </>
  );
}
