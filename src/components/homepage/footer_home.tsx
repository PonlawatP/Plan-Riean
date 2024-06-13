import Link from 'next/link';

const FooterLand = () => {
  return (
    <>
      <div className="bg-stone-700 p-[8%]">
        <div className="max-md:text-start text-center text-white md:flex font-bold justify-between p-3 lg:p-[90px]">
          <div className="max-md:my-5">
            <p>WHO WE ARE</p>
            <div></div>
          </div>
          <div className="max-md:my-5">
            <p>SUPPORT</p>
            <div></div>
          </div>
          <div className="max-md:my-5">
            <p>PRODUCT</p>
            <div></div>
          </div>
          <div className="max-md:my-5">
            <p>REPORT A PROBLEM</p>
            <div></div>
          </div>
        </div>
        <hr />
        <div className="max-md:text-start text-center text-white lg:flex font-bold justify-between p-3 lg:p-[90px]">
          <div className="lg:w-[33%] max-md:my-5">
            <div className="flex items-center ">
              <img width={40} src="/icon-inv.png" alt="logo" />
              <p>PlanRiean</p>
            </div>
            <div className="text-start text-sm m-2 py-2 font-normal">
              <p>
                เราเป็นแพลตฟอร์มที่ช่วยให้นักศึกษาสามารถวางแผนการเรียน และค้นหาข้อมูลรายวิชาได้อย่างง่ายดายและรวดเร็ว
                นักศึกษาสามารถเห็น รายละเอียดวิชาในแบบจำลองตรางเรียนทันที
              </p>
            </div>
          </div>
          <div className="lg:w-[33%] max-md:my-5">
            <p>Contact Us</p>
            <div className="p-3"></div>
          </div>
          <div className="lg:w-[33%] max-md:my-5">
            <p>Follow Us</p>
            <div className="p-3">
              <p className="text-[10px]">Various platforms</p>
              <div className="flex max-md:justify-between justify-center items-center">
                <Link href="/">
                  <svg
                    className="mx-1"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9997 0C7.16338 0 0 7.18983 0 16.0588C0 23.5897 5.16598 29.9091 12.1348 31.6448V20.9663H8.83566V16.0588H12.1348V13.9442C12.1348 8.47839 14.5994 5.94496 19.9458 5.94496C20.9596 5.94496 22.7087 6.14473 23.4242 6.34386V10.7921C23.0466 10.7523 22.3906 10.7324 21.5759 10.7324C18.9526 10.7324 17.9388 11.73 17.9388 14.3231V16.0588H23.165L22.2671 20.9663H17.9388V32C25.8612 31.0397 32 24.2693 32 16.0588C31.9994 7.18983 24.836 0 15.9997 0Z"
                      fill="#E9E9E9"
                    />
                  </svg>
                </Link>
                <Link href="/">
                  <svg
                    className="mx-1"
                    width="30"
                    height="32"
                    viewBox="0 0 30 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1442_12255)">
                      <path
                        d="M15 2.88125C19.0078 2.88125 19.4824 2.9 21.0586 2.975C22.5234 3.04375 23.3145 3.30625 23.8418 3.525C24.5391 3.8125 25.043 4.1625 25.5645 4.71875C26.0918 5.28125 26.4141 5.8125 26.6836 6.55625C26.8887 7.11875 27.1348 7.96875 27.1992 9.525C27.2695 11.2125 27.2871 11.7188 27.2871 15.9875C27.2871 20.2625 27.2695 20.7688 27.1992 22.45C27.1348 24.0125 26.8887 24.8563 26.6836 25.4188C26.4141 26.1625 26.0859 26.7 25.5645 27.2563C25.0371 27.8188 24.5391 28.1625 23.8418 28.45C23.3145 28.6688 22.5176 28.9313 21.0586 29C19.4766 29.075 19.002 29.0938 15 29.0938C10.9922 29.0938 10.5176 29.075 8.94141 29C7.47656 28.9313 6.68555 28.6688 6.1582 28.45C5.46094 28.1625 4.95703 27.8125 4.43555 27.2563C3.9082 26.6938 3.58594 26.1625 3.31641 25.4188C3.11133 24.8563 2.86523 24.0063 2.80078 22.45C2.73047 20.7625 2.71289 20.2563 2.71289 15.9875C2.71289 11.7125 2.73047 11.2063 2.80078 9.525C2.86523 7.9625 3.11133 7.11875 3.31641 6.55625C3.58594 5.8125 3.91406 5.275 4.43555 4.71875C4.96289 4.15625 5.46094 3.8125 6.1582 3.525C6.68555 3.30625 7.48242 3.04375 8.94141 2.975C10.5176 2.9 10.9922 2.88125 15 2.88125ZM15 0C10.9277 0 10.418 0.01875 8.81836 0.09375C7.22461 0.16875 6.12891 0.44375 5.17969 0.8375C4.18945 1.25 3.35156 1.79375 2.51953 2.6875C1.68164 3.575 1.17188 4.46875 0.785156 5.51875C0.416016 6.5375 0.158203 7.7 0.0878906 9.4C0.0175781 11.1125 0 11.6562 0 16C0 20.3438 0.0175781 20.8875 0.0878906 22.5938C0.158203 24.2938 0.416016 25.4625 0.785156 26.475C1.17188 27.5313 1.68164 28.425 2.51953 29.3125C3.35156 30.2 4.18945 30.75 5.17383 31.1562C6.12891 31.55 7.21875 31.825 8.8125 31.9C10.4121 31.975 10.9219 31.9937 14.9941 31.9937C19.0664 31.9937 19.5762 31.975 21.1758 31.9C22.7695 31.825 23.8652 31.55 24.8145 31.1562C25.7988 30.75 26.6367 30.2 27.4688 29.3125C28.3008 28.425 28.8164 27.5313 29.1973 26.4813C29.5664 25.4625 29.8242 24.3 29.8945 22.6C29.9648 20.8938 29.9824 20.35 29.9824 16.0063C29.9824 11.6625 29.9648 11.1188 29.8945 9.4125C29.8242 7.7125 29.5664 6.54375 29.1973 5.53125C28.8281 4.46875 28.3184 3.575 27.4805 2.6875C26.6484 1.8 25.8105 1.25 24.8262 0.84375C23.8711 0.45 22.7813 0.175 21.1875 0.1C19.582 0.01875 19.0723 0 15 0Z"
                        fill="#E9E9E9"
                      />
                      <path
                        d="M15.002 7.78125C10.748 7.78125 7.29688 11.4625 7.29688 16C7.29688 20.5375 10.748 24.2188 15.002 24.2188C19.2559 24.2188 22.707 20.5375 22.707 16C22.707 11.4625 19.2559 7.78125 15.002 7.78125ZM15.002 21.3312C12.2422 21.3312 10.0039 18.9438 10.0039 16C10.0039 13.0563 12.2422 10.6687 15.002 10.6687C17.7617 10.6687 20 13.0563 20 16C20 18.9438 17.7617 21.3312 15.002 21.3312Z"
                        fill="#E9E9E9"
                      />
                      <path
                        d="M24.8086 7.45586C24.8086 8.51836 24 9.37461 23.0098 9.37461C22.0137 9.37461 21.2109 8.51211 21.2109 7.45586C21.2109 6.39336 22.0195 5.53711 23.0098 5.53711C24 5.53711 24.8086 6.39961 24.8086 7.45586Z"
                        fill="#E9E9E9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1442_12255">
                        <rect width="30" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link href="/">
                  <svg
                    className="mx-1"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.6016 12C39.6016 12 39.2109 9.24219 38.0078 8.03125C36.4844 6.4375 34.7812 6.42969 34 6.33594C28.4063 5.92969 20.0078 5.92969 20.0078 5.92969H19.9922C19.9922 5.92969 11.5938 5.92969 6 6.33594C5.21875 6.42969 3.51562 6.4375 1.99219 8.03125C0.789063 9.24219 0.40625 12 0.40625 12C0.40625 12 0 15.2422 0 18.4766V21.5078C0 24.7422 0.398437 27.9844 0.398437 27.9844C0.398437 27.9844 0.789062 30.7422 1.98437 31.9531C3.50781 33.5469 5.50781 33.4922 6.39844 33.6641C9.60156 33.9688 20 34.0625 20 34.0625C20 34.0625 28.4063 34.0469 34 33.6484C34.7812 33.5547 36.4844 33.5469 38.0078 31.9531C39.2109 30.7422 39.6016 27.9844 39.6016 27.9844C39.6016 27.9844 40 24.75 40 21.5078V18.4766C40 15.2422 39.6016 12 39.6016 12ZM15.8672 25.1875V13.9453L26.6719 19.5859L15.8672 25.1875Z"
                      fill="#E9E9E9"
                    />
                  </svg>
                </Link>
                <Link href="/">
                  <svg
                    className="mx-1"
                    width="24"
                    height="29"
                    viewBox="0 0 24 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6459 0H12.9106V19.7536C12.9106 22.1073 11.0894 24.0406 8.82294 24.0406C6.55649 24.0406 4.73525 22.1073 4.73525 19.7536C4.73525 17.4421 6.51602 15.5507 8.70155 15.4667V10.5073C3.88533 10.5913 0 14.6681 0 19.7536C0 24.8812 3.96627 29 8.86343 29C13.7605 29 17.7268 24.8391 17.7268 19.7536V9.62462C19.5076 10.9696 21.6931 11.7681 24 11.8102V6.85073C20.4385 6.72464 17.6459 3.69855 17.6459 0Z"
                      fill="#E9E9E9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="text-white text-xs p-1 mb-5 text-end">© 2024 - PlanRiean.com เราขอสงวนลิขสิทธิ์ </p>
      </div>
    </>
  );
};

export default FooterLand;
