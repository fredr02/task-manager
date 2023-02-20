import React, { useRef, useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ModalCard from './ModalCard';

import { AuthContext } from './AuthContext';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { task } from '../types';

type AddTaskProps = {
  flipAddTask: () => void;
  addTask: (task: task) => void;
};

const AddTask = ({ flipAddTask, addTask }: AddTaskProps) => {
  const taskInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const user = useContext(AuthContext);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDateString = new Date().toLocaleDateString();

    const taskInputValue = taskInput.current!.value;
    const descriptionInputValue = descriptionInput.current!.value;

    if (taskInputValue) {
      flipAddTask();
      addDoc(collection(db, `users/${user?.uid}/todos`), {
        name: taskInputValue,
        description: descriptionInputValue,
        time: currentDateString,
        isComplete: false,
      }).then((docref) => {
        addTask({
          id: docref.id,
          name: taskInputValue,
          description: descriptionInputValue,
          time: currentDateString,
          isComplete: false,
        } as task);
      });
    }
  };
  return (
    <ModalCard>
      <>
        <h1 className="text-2xl">Add Task</h1>
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            ref={taskInput}
            placeholder="Task Name"
            className="mt-2 w-full rounded border p-4"
            required
          ></input>

          <textarea
            ref={descriptionInput}
            placeholder="Description"
            className="mt-2 h-[8rem] w-full rounded border p-4"
          ></textarea>

          <input
            type="submit"
            className="mx-auto mt-4 block cursor-pointer rounded-2xl bg-primary p-3 px-6"
          ></input>
        </form>

        <button
          onClick={flipAddTask}
          className=" absolute top-2 right-2 flex items-center justify-around text-3xl"
        >
          <AiOutlineCloseCircle />
        </button>
      </>
    </ModalCard>
  );
};

export default AddTask;
