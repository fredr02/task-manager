import React from 'react';

const Header = () => {
  const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const DATE = new Date();
  const CURRENTHOUR = DATE.getHours();
  const dayOfWeek = WEEKDAYS[DATE.getDay()];

  return (
    <div className="flex flex-col ">
      <div className="flex flex-1 justify-end">
        <button className="text-white bg-[#172841] w-10 h-10 p-3 m-3 rounded-full">
          +
        </button>
      </div>
      <h1 className="block text-6xl text-primary">
        {CURRENTHOUR <= 12 ? (
          <span>
            Good <br /> Morning!
          </span>
        ) : (
          <span>
            Good <br /> Afternoon!
          </span>
        )}
      </h1>
      <div className="flex justify-between mt-5">
        <div className="text-white">
          <h3>{`Today's ${dayOfWeek}`}</h3>
          <p className="text-gray text-sm">Dec 12, 2022</p>
        </div>
        <div className="text-white text-right">
          <h3 className="font-light">75% Done</h3>
          <p className="text-gray">Completed Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
