import React from 'react';

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const times = ["08:00"];

const Calendar = () => {
  return (
    <div className="calendar-container w-6/12 h-6/12 grid bg-red-300">
        <div className="header-day">
            <div className=""></div>
        </div>
        {days.map((d,dindex)=><div key={dindex}>
            <div className="header-day">{d}</div>
        </div>)}
    </div>
  );
};

export default Calendar;
