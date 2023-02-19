import React, { SetStateAction, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ModalCard from './ModalCard';

import { collection, addDoc, doc } from 'firebase/firestore';
import { db, app } from '../firebase';

import { task } from '../types';

type AddTaskProps = {
  flipAddTask: () => void;
  addTask: (task: task) => void;
};

const AddTask = ({ flipAddTask, addTask }: AddTaskProps) => {
  const inputName = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputName.current!.value) {
      addDoc(collection(db, 'todos'), {
        name: inputName.current!.value,
        isComplete: false,
      }).then((docref) => {
        addTask({
          id: docref.id,
          name: inputName.current!.value,
          isComplete: false,
        } as task);
        flipAddTask();
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
            ref={inputName}
            placeholder="Task Name"
            className="mt-2 w-full rounded border p-4"
            required
          ></input>
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
