import React, { useEffect, useState, useReducer } from 'react';
import { task, appState } from './types';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';
import { MdAddTask } from 'react-icons/md';

type reducerAction = {
  type: 'updateTask' | 'setTaskList' | 'changeFilter';
  payload: task;
};

const reducer = (state: appState, action: reducerAction) => {
  if (action.type === 'updateTask') {
    const removedItemList = state.taskList.map((task: task) => {
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
  const initialState: appState = {
    taskList: [],
    filter: 'all',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const updateTask = async (updatedTask: task) => {
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
    <div className="relative mx-4 flex h-screen max-w-md flex-col pt-4 sm:mx-auto">
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
      <button className="fixed bottom-0 m-3 flex h-[4rem] w-[4rem] items-center justify-around self-center rounded-full  bg-primary text-center text-2xl leading-none text-white hover:bg-[#4C78EE] sm:hidden">
        <MdAddTask />
      </button>
    </div>
  );
};

export default App;
