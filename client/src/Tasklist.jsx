import React from 'react';

import Task from './Task';

const Tasklist = ({ tasks }) => {
  return (
    <div className="flex flex-col mt-5 gap-4">
      <div className="flex gap-4">
        <div className="bg-white rounded-xl font-sm p-3">{tasks.length}</div>
        <h2 className="text-primary text-5xl font-light">Tasks</h2>
      </div>
      <hr className="border-white"></hr>
      {tasks.map((task) => {
        <Task task={task} />;
      })}
    </div>
  );
};

export default Tasklist;
