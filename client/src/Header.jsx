import React from 'react';

import { MdAddTask } from 'react-icons/md';

const Header = ({ tasks }) => {
  const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const DATE = new Date();
  const year = DATE.getFullYear();
  const month = DATE.getMonth();
  const date = DATE.getDate();
  const currentHour = DATE.getHours();

  const dayOfWeek = WEEKDAYS[DATE.getDay()];
  const monthString = MONTHS[month];

  let completeCount = 0;
  tasks.forEach((task) => {
    task.isComplete == true && (completeCount += 1);
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="block text-6xl text-primary">
          {currentHour <= 12 ? (
            <span>
              Good <br /> Morning!
            </span>
          ) : (
            <span>
              Good <br /> Afternoon!
            </span>
          )}
        </h1>
        <button className="m-3 flex h-12 w-12 items-center justify-around rounded-full bg-[#172841] p-3 text-white hover:bg-[#283951]">
          <MdAddTask />
        </button>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="text-white">
          <h3>{`Today's ${dayOfWeek}`}</h3>
          <p className="text-sm text-gray">
            {monthString} {date}, {year}
          </p>
        </div>
        <div className="text-right text-white">
          <h3 className="font-light">
            {(completeCount / tasks.length) * 100}% Done
          </h3>
          <p className="text-gray">Completed Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
