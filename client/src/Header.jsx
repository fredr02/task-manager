import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-1 justify-end">
        <button className="text-white bg-[#172841] w-10 h-10 p-3 m-3 rounded-full">
          +
        </button>
      </div>
      <h1 className="block text-4xl text-primary">Good morning!</h1>
    </div>
  );
};

export default Header;
