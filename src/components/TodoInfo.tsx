import React from 'react';
import { AiFillDownCircle, AiOutlineMenu } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import { task, taskChange } from '../types';

type TodoInfoProps = {
  state: {
    taskList: task[] | undefined;
    filter: 'active' | 'all';
  };
  currentTaskId: string;
  setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  taskChange: taskChange;
};
const TodoInfo = ({
  currentTaskId,
  setCurrentTaskId,
  taskChange,
  state,
}: TodoInfoProps) => {
  let currentTask: task;

  state.taskList!.forEach((task) => {
    if (task.id === currentTaskId) currentTask = task;
  });

  const closeClickHandler = () => {
    setCurrentTaskId(null);
  };
  const checkClickHandler = () => {
    taskChange.updateTask({ ...currentTask, isComplete: true });
  };

  const changeName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value != '')
      taskChange.updateTask({ ...currentTask, name: e.target.value });
  };
  const changeDescription = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value != '')
      taskChange.updateTask({ ...currentTask, description: e.target.value });
  };

  let description = currentTask!.description
    ? '   ' + currentTask!.description
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
        <input
          className="mt-4 rounded border bg-[#9DECFF] p-1 text-2xl font-semibold"
          defaultValue={currentTask!.name}
          onBlur={changeName}
        ></input>
        <p className="mt-8 text-gray">Additional Description</p>
        <textarea
          onBlur={changeDescription}
          className="rounded border bg-[#9DECFF] p-1 pl-3"
          placeholder="No Additional Description"
        >
          {currentTask!.description || ''}
        </textarea>
        <p className="mt-8 text-gray">Created</p>
        <p className="pl-4">{currentTask!.time}</p>
        {!currentTask!.isComplete ? (
          <button
            onClick={checkClickHandler}
            className="fixed bottom-[5%] left-0 right-0 mx-auto w-fit rounded-full bg-[black] bg-opacity-10 p-8 text-4xl hover:bg-opacity-20"
          >
            {<FiCheck />}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TodoInfo;
