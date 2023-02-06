import React, { useEffect, useState, useReducer } from 'react';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';
import { MdAddTask } from 'react-icons/md';

const reducer = (state, action) => {
  if (action.type === 'updateTask') {
    const removedItemList = state.taskList.map((task) => {
      if (task._id == action.payload._id) return { ...action.payload };
      return { ...task };
    });
    return {
      ...state,
      taskList: removedItemList,
    };
  }
  if (action.type === 'setTaskList') {
    return { ...state, taskList: action.payload };
  } else if (action.type === 'changeFilter') {
    return {
      ...state,
      filter: action.payload,
    };
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    taskList: [],
    filter: 'all',
  });

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    const data = await fetch(import.meta.env.VITE_API_BASE, {
      method: 'GET',
    });
    const tasks = await data.json();
    dispatch({ type: 'setTaskList', payload: tasks });
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/${updatedTask._id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...updatedTask }),
      }
    );

    dispatch({ type: 'updateTask', payload: updatedTask });
  };

  return (
    <div className="flex flex-col pt-4 h-screen max-w-md sm:mx-auto mx-4 relative">
      {isLoading && <Loading />}

      {!isLoading && <Header tasks={state.taskList} />}
      {!isLoading && (
        <Tasklist
          originalTasks={state.taskList}
          filter={state.filter}
          dispatch={dispatch}
          updateTask={updateTask}
        />
      )}
      <button className="flex justify-around items-center text-white bg-primary hover:bg-[#4C78EE] w-[4rem] h-[4rem] text-center text-2xl  m-3 rounded-full leading-none self-center fixed bottom-0 sm:hidden">
        <MdAddTask />
      </button>
    </div>
  );
};

export default App;
