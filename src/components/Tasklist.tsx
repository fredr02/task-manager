import React, { useState, useEffect } from 'react';
import { task, taskId } from '../types';

import Task from './Task';

type Props = {
  originalTasks: task[];
  filter: 'all' | 'active';
  changeFilter: (type: 'all' | 'active') => void;
  updateTask: (updatedTask: task) => Promise<void>;
  deleteTask: (taskId: taskId) => void;
};

const Tasklist = ({
  originalTasks,
  filter,
  updateTask,
  deleteTask,
  changeFilter,
}: Props) => {
  let enabled = 'bg-primary text-[black] rounded-full p-2 box-border';
  let disabled = 'bg-[#0e1621] text-[white] rounded-full p-2 box-border';
  let sortedTasks: task[] = originalTasks.sort(
    (a, b) => Number(a.isComplete) - Number(b.isComplete)
  );
  let filteredTasks: task[];
  if (filter === 'active') {
    filteredTasks = sortedTasks.filter((task) => !task.isComplete);
  } else if (filter === 'all') {
    filteredTasks = sortedTasks;
  }

  return (
    <div className="mt-5 flex h-full flex-col gap-4 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="font-sm rounded-xl bg-white p-3">
            {filteredTasks!.length}
          </div>
          <h2 className="text-5xl font-light text-primary">Tasks</h2>
        </div>
        <div>
          <button
            className={filter == 'active' ? enabled : disabled}
            onClick={() => changeFilter('active')}
          >
            Active
          </button>
          <button
            className={` ${
              filter == 'all' ? enabled : disabled
            } ml-2 min-w-[75px]`}
            onClick={() => changeFilter('all')}
          >
            All
          </button>
        </div>
      </div>
      <hr className="border-white"></hr>
      <div className="flex h-full flex-grow-0 flex-col gap-4 overflow-auto">
        {filteredTasks!.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
