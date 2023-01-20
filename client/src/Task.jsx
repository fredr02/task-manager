import React from 'react';

import { FiCheck } from 'react-icons/fi';

const Task = ({ task, index }) => {
  return (
    <div
      className={`h-[100%] flex justify-between items-center min-h-[50px] bg-primary rounded-3xl cursor-pointer p-3 ${
        task.isComplete && 'bg-opacity-30'
      }`}
    >
      <h1 className="text-xl font-light">{task.name}</h1>
      {!task.isComplete && (
        <button className="bg-[black] bg-opacity-10 rounded-full p-3 hover:bg-opacity-20">
          {<FiCheck />}
        </button>
      )}
    </div>
  );
};

export default Task;
