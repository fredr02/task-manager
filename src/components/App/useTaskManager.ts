import React, { useEffect, useState, useReducer } from 'react';
import { task, appState, taskId } from '../../types';

import { db } from '../../firebase';

import {
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import reducer from './TaskManagerReducer';

const useTaskManager = () => {
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

  const deleteTask = (taskId: taskId) => {
    const docRef = doc(db, 'todos', taskId);
    deleteDoc(docRef);
    dispatch({ type: 'deleteTask', payload: taskId });
  };

  return {
    showAddTask,
    deleteTask,
    updateTask,
    dispatch,
    flipAddTask,
    isLoading,
    state,
  };
};

export default useTaskManager;
