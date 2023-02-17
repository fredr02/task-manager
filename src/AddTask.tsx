import React, { SetStateAction, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ModalCard from './ModalCard';

import { collection, addDoc, doc } from 'firebase/firestore';
import { db, app } from './firebase';

type AddTaskProps = {
  flipAddTask: () => void;
};

const AddTask = ({ flipAddTask }: AddTaskProps) => {
  const inputName = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.current!.value) {
      addDoc(collection(db, 'todos'), {
        name: inputName.current!.value,
        isComplete: false,
      }).then((response) => {
        console.log('Added!');
        flipAddTask();
      });
    }
  };
  return (
    <ModalCard>
      <>
        <h1 className="text-lg">Add Task</h1>
        <form onSubmit={submitHandler}>
          <input
            ref={inputName}
            placeholder="Todo Name"
            className="rounded p-4"
            required
          ></input>
          <input
            type="submit"
            className="mx-auto mt-6 block cursor-pointer rounded-2xl bg-primary p-3"
          ></input>
        </form>

        <button onClick={flipAddTask} className="absolute top-2 right-2">
          <AiOutlineClose />
        </button>
      </>
    </ModalCard>
  );
};

export default AddTask;
