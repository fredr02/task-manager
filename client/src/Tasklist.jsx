import React, { useState } from 'react';
import { useEffect } from 'react';

import Task from './Task';

const Tasklist = ({ originalTasks, filter, dispatch, updateTask }) => {
  let enabled = 'bg-primary text-[black] rounded-full p-2 box-border';
  let disabled = 'bg-[#0e1621] text-[white] rounded-full p-2 box-border';

  let sortedTasks = originalTasks.sort((a, b) => a.isComplete - b.isComplete);

  let filteredTasks;
  if (filter === 'active') {
    filteredTasks = sortedTasks.filter((task) => !task.isComplete);
  } else if (filter === 'all') {
    filteredTasks = sortedTasks;
  }

  return (
    <div className="flex flex-col mt-5 gap-4 h-full overflow-scroll">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="bg-white rounded-xl font-sm p-3">
            {filteredTasks.length}
          </div>
          <h2 className="text-primary text-5xl font-light">Tasks</h2>
        </div>
        <div>
          <button
            className={filter == 'active' ? enabled : disabled}
            onClick={() =>
              dispatch({ type: 'changeFilter', payload: 'active' })
            }
          >
            Active
          </button>
          <button
            className={` ${
              filter == 'all' ? enabled : disabled
            } ml-2 min-w-[75px]`}
            onClick={() => dispatch({ type: 'changeFilter', payload: 'all' })}
          >
            All
          </button>
        </div>
      </div>
      <hr className="border-white"></hr>
      <div className="flex flex-col gap-4 h-full overflow-scroll">
        {filteredTasks.map((task, index) => (
          <Task
            key={task._id}
            task={task}
            updateTask={updateTask}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
