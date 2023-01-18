import React from 'react';

const Header = () => {
  const time = new Date().getHours();

  return (
    <div className="flex flex-col ">
      <div className="flex flex-1 justify-end">
        <button className="text-white bg-[#172841] w-10 h-10 p-3 m-3 rounded-full">
          +
        </button>
      </div>
      <h1 className="block text-6xl text-primary">
        {time <= 12 ? (
          <span>
            Good <br /> Morning!
          </span>
        ) : (
          <span>
            Good <br /> Afternoon!
          </span>
        )}
      </h1>
    </div>
  );
};

export default Header;
