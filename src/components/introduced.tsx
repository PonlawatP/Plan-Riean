export function Introduced(props){
    const {state, app_version} = props;
    return <div className={`smooth absolute top-3 left-3 z-50 ${state.viewSchedule ? "opacity-0 pointer-events-none" : ""}`}>
        <p className='text-black/40'>เวอร์ชั่นทดสอบ {app_version}</p>
        <a className='smooth text-black/60 font-bold hover:pl-2 hover:text-black/80' href='https://linktr.ee/plutopon'>แจ้งปัญหา / เสนอไอเดีย</a>
      </div>
}