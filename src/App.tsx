import React, { useEffect, useState, useReducer } from 'react';
import AddTask from './AddTask';
('react');
import { db } from './firebase';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { task, appState } from './types';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';
import { MdAddTask } from 'react-icons/md';

export type reducerAction = {
  type: 'updateTask' | 'setTaskList' | 'changeFilter' | 'addTask';
  payload: task[] | task | 'all' | 'active';
};

const reducer = (state: appState, action: reducerAction): appState => {
  let taskAction = action.payload as task;
  let filterAction = action.payload as 'all' | 'active';
  let taskListAction = action.payload as task[];

  if (action.type === 'updateTask') {
    const removedItemList = state.taskList.map((task: task) => {
      if (task.id == taskAction.id) return { ...taskAction };
      return { ...task };
    });

    return {
      ...state,
      taskList: removedItemList,
    };
  }
  if (action.type === 'setTaskList') {
    return { ...state, taskList: taskListAction };
  }
  if (action.type === 'addTask') {
    return {
      ...state,
      taskList: [...state.taskList, action.payload as task],
    };
  } else if (action.type === 'changeFilter') {
    return {
      ...state,
      filter: filterAction,
    };
  }
  return state;
};

const App = () => {
  const initialState: appState = {
    taskList: [],
    filter: 'all',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const flipAddTask = () => {
    setShowAddTask((p) => !p);
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const docsArray = querySnapshot.docs;
    let tasks: task[] = [] as task[];
    docsArray.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as task);
    });
    dispatch({ type: 'setTaskList', payload: tasks });
  };

  const updateTask = async (updatedTask: task) => {
    const docRef = doc(db, 'todos', updatedTask.id);
    updateDoc(docRef, { ...updatedTask });

    dispatch({ type: 'updateTask', payload: updatedTask });
  };

  const addTaskClickHandler = () => {};

  return (
    <div className="relative mx-4 flex h-screen max-w-md flex-col pt-4 sm:mx-auto">
      {isLoading && <Loading />}

      {!isLoading && (
        <Header tasks={state.taskList} flipAddTask={flipAddTask} />
      )}
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
      {showAddTask ? (
        <AddTask dispatch={dispatch} flipAddTask={flipAddTask} />
      ) : null}
    </div>
  );
};

export default App;
