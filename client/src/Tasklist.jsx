import React, { useState } from 'react';
import { useEffect } from 'react';

import Task from './Task';

const Tasklist = ({ tasks, filter, dispatch, updateTask }) => {
  let enabled = 'bg-primary text-[black] rounded-full p-2 box-border';
  let disabled = 'bg-[#0e1621] text-[white] rounded-full p-2 box-border';

  return (
    <div className="flex flex-col mt-5 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="bg-white rounded-xl font-sm p-3">{tasks.length}</div>
          <h2 className="text-primary text-5xl font-light">Tasks</h2>
        </div>
        <div>
          <button
            className={filter == 'active' ? enabled : disabled}
            onClick={() => dispatch({ type: 'active' })}
          >
            Active
          </button>
          <button
            className={` ${
              filter == 'all' ? enabled : disabled
            } ml-2 min-w-[75px]`}
            onClick={() => dispatch({ type: 'all' })}
          >
            All
          </button>
        </div>
      </div>
      <hr className="border-white"></hr>
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          task={task}
          updateTask={updateTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Tasklist;
