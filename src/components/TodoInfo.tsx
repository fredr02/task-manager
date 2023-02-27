import React from 'react';
import { AiFillDownCircle, AiOutlineMenu } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
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
    taskChange.updateTask({
      ...currentTask,
      isComplete: !currentTask.isComplete,
    });
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

  let checkBoxStyles = currentTask!.isComplete
    ? 'bg-[#10b981] hover:bg-[#059669]'
    : 'bg-[#000] bg-opacity-10 hover:bg-opacity-20';
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
        <div className="mt-4 flex flex-grow-0 flex-row">
          <button
            onClick={checkClickHandler}
            className={`w-fit rounded-full p-2 text-center text-2xl ${checkBoxStyles}`}
          >
            {<BsCheck />}
          </button>
          <input
            className="ml-2 w-auto flex-1 rounded bg-[#000] bg-opacity-10 p-1 pl-2 text-2xl font-semibold"
            defaultValue={currentTask!.name}
            onBlur={changeName}
          ></input>
        </div>
        <hr className="mt-4 text-gray"></hr>
        <p className="mt-4 text-gray">Additional Description</p>
        <textarea
          onBlur={changeDescription}
          className="rounded bg-[#000] bg-opacity-10 p-1 pl-3"
          placeholder="No Additional Description"
        >
          {currentTask!.description || ''}
        </textarea>
        <p className="mt-8 text-gray">Created</p>
        <p className="pl-4">{currentTask!.time}</p>
      </div>
    </div>
  );
};

export default TodoInfo;
