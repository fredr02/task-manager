import React from 'react';

import { FiCheck } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';
import { task, taskId } from '../types';

type Props = {
  task: task;
  updateTask: (updatedTask: task) => Promise<void>;
  deleteTask: (taskId: taskId) => void;
  setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>;
};
const Task = ({ task, updateTask, deleteTask, setCurrentTaskId }: Props) => {
  const taskClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentTaskId(task.id);
  };

  const completeTaskHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTask({ ...task, isComplete: true });
  };
  const deleteteTaskHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };
  return (
    <div
      onClick={taskClickHandler}
      className={`flex min-h-min cursor-pointer items-center justify-between rounded-3xl bg-primary p-3 ${
        task.isComplete && 'bg-opacity-30'
      }`}
    >
      <h1 className="text-xl font-light">{task.name}</h1>
      {!task.isComplete && (
        <button
          onClick={completeTaskHandler}
          className="rounded-full bg-[black] bg-opacity-10 p-3 hover:bg-opacity-20"
        >
          {<FiCheck />}
        </button>
      )}
      {task.isComplete && (
        <button
          onClick={deleteteTaskHandler}
          className="rounded-full bg-[black] bg-opacity-10 p-3 hover:bg-opacity-20"
        >
          <BiTrash />
        </button>
      )}
    </div>
  );
};

export default Task;
