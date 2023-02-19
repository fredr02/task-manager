import React from 'react';
import { AiFillDownCircle, AiOutlineMenu } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import { task, taskChange } from '../types';

type TodoInfoProps = {
  currentTask: task;
  setCurrentTask: React.Dispatch<React.SetStateAction<task | null>>;
  taskChange: taskChange;
};
const TodoInfo = ({
  currentTask,
  setCurrentTask,
  taskChange,
}: TodoInfoProps) => {
  const closeClickHandler = () => {
    setCurrentTask(null);
  };
  const checkClickHandler = () => {
    taskChange.updateTask({ ...currentTask, isComplete: true });
  };

  let description = currentTask.description
    ? '   ' + currentTask.description
    : '   No Additional Description';
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#9DECFF]">
      <div className="text-black mx-4 flex h-screen max-w-md flex-col pt-4 sm:mx-auto">
        <div className="flex justify-between">
          <button onClick={closeClickHandler} className="text-5xl">
            <AiFillDownCircle />
          </button>
          <button onClick={closeClickHandler} className="text-4xl">
            <AiOutlineMenu />
          </button>
        </div>
        <p className="mt-2 w-fit rounded-2xl border-2 px-2">Todo List</p>
        <h1 className="mt-4 text-2xl font-semibold">{currentTask.name}</h1>
        <p className="mt-8 text-gray">Additional Description</p>
        <p className="pl-4">
          {currentTask.description || 'No Additional Description'}
        </p>
        <p className="text-gray">Created</p>
        <p className="pl-4">{currentTask.time}</p>
        {!currentTask.isComplete ? (
          <button
            onClick={checkClickHandler}
            className="fixed bottom-[10rem] left-0 right-0 mx-auto w-fit rounded-full bg-[black] bg-opacity-10 p-8 text-4xl hover:bg-opacity-20"
          >
            {<FiCheck />}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TodoInfo;
