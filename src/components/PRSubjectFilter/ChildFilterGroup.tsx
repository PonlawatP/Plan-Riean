import { useState } from 'react';
import SubjectObject from './SubjectObject';
import Image from 'next/image';

export default function ChildFilterGroup(props: any) {
  const {
    title = 'title',
    desc = 'desc',
    className = '',
    checkbox,
    img,
    onCheckedClick = (e: string) => {},
    subDesc = 'subdesc',
    checkedAllText = 'text',
    checked = false,
    checkedAll = false,
  } = props;
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <>
      <div className={`sticky top-0 ${!toggle ? 'border-b-2' : ''}`}>
        <button
          onClick={() => handleToggle()}
          className={`fade-y group py-2 px-5 text-left w-full flex justify-between items-center ${
            toggle ? 'bg-white' : ''
          } ${className}`}
        >
          {img ? (
            <div className={`absolute smooth-all ${!toggle ? '-left-1' : 'left-0'} w-40 h-full overflow-hidden -z-10`}>
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
            className={`block absolute w-full h-full left-0 group-hover:bg-black/10 group-active:bg-slate-600/30 -z-10`}
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
                    <i className={`text-pr-gray-1 bx bx-checkbox text-xl smooth-all group-hover/select:opacity-0`}></i>
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
            <div className={`smooth-all ${img ? (toggle ? 'translate-x-4' : 'group-hover:translate-x-1') : ''}`}>
              {title !== 'title' ? <h1 className="font-bold">{title}</h1> : null}
              {desc !== 'desc' ? <p className="">{desc}</p> : null}
            </div>
          </div>
          <span className="flex items-center">
            {subDesc !== 'subdesc' ? <p className="absolute right-12 text-sm text-pr-gray-2">{subDesc}</p> : null}
            <i className={`bx bx-chevron-down text-2xl smooth-all ${toggle ? 'rotate-180' : ''}`}></i>
          </span>
        </button>
      </div>

      {toggle ? props.children : null}
    </>
  );
}
