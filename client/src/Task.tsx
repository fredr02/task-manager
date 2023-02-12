import React from 'react';

import { FiCheck } from 'react-icons/fi';
import { task } from './types';

type Props = {
  task: task;
  updateTask: (updatedTask: task) => Promise<void>;
};
const Task = ({ task, updateTask }: Props) => {
  return (
    <div
      className={`flex min-h-[50px] cursor-pointer items-center justify-between rounded-3xl bg-primary p-3 ${
        task.isComplete && 'bg-opacity-30'
      }`}
    >
      <h1 className="text-xl font-light">{task.name}</h1>
      {!task.isComplete && (
        <button
          onClick={() => updateTask({ ...task, isComplete: true })}
          className="rounded-full bg-[black] bg-opacity-10 p-3 hover:bg-opacity-20"
        >
          {<FiCheck />}
        </button>
      )}
    </div>
  );
};

export default Task;
