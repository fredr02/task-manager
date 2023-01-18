import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1 justify-end">
        <button className="text-white bg-blue-900 p-3 m-3 rounded-full">
          +
        </button>
      </div>
      <h1 className="block text-4xl">Good morning!</h1>
    </div>
  );
};

export default Header;
