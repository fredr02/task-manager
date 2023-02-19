import React, { useEffect, useState, useReducer } from 'react';
import { task, appState, taskId } from '../types';

import { db } from '../firebase';

import {
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';

const useTaskManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<task | null>(null);
  const [taskList, setTaskList] = useState<task[]>();
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const flipAddTask = () => {
    setShowAddTask((p) => !p);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const docsArray = querySnapshot.docs;
    let tasks: task[] = [] as task[];
    docsArray.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as task);
    });
    setTaskList(tasks);
    setIsLoading(false);
  };

  const addTask = (task: task) => {
    setTaskList((p) => {
      return [...(p as task[]), task];
    });
    console.log(taskList);
  };
  const updateTask = async (updatedTask: task) => {
    const docRef = doc(db, 'todos', updatedTask.id);
    updateDoc(docRef, { ...updatedTask });

    setTaskList((p) => {
      return p!.map((task: task) => {
        if (task.id == updatedTask.id) return { ...updatedTask };
        return { ...task };
      });
    });
  };

  const deleteTask = (taskId: taskId) => {
    const docRef = doc(db, 'todos', taskId);
    deleteDoc(docRef);

    setTaskList((p) =>
      p!.filter((task) => {
        if (task.id === taskId) {
          return false;
        } else return true;
      })
    );
  };

  const changeFilter = (type: 'active' | 'all') => {
    setFilter(type);
  };

  const state = {
    taskList: taskList,
    filter: filter,
  };

  const taskChange = {
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };
  return {
    taskChange,
    showAddTask,
    addTask,
    deleteTask,
    updateTask,
    changeFilter,
    flipAddTask,
    isLoading,
    state,
    currentTask,
    setCurrentTask,
  };
};

export default useTaskManager;
