import React from 'react';

const Tasklist = () => {
  return (
    <div className="flex flex-col mt-3 gap-4">
      <div className="flex gap-4">
        <div className="bg-white rounded-xl font-sm p-3">12</div>
        <h2 className="text-primary text-5xl font-light">Tasks</h2>
      </div>
      <hr className="border-white"></hr>
    </div>
  );
};

export default Tasklist;
