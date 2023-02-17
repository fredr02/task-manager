import React, { SetStateAction, useRef } from 'react';
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
        <form onSubmit={submitHandler}>
          <input ref={inputName} placeholder="Todo Name" required></input>
          <input
            type="submit"
            className="block cursor-pointer rounded-2xl bg-primary p-3"
          ></input>
        </form>

        <button onClick={flipAddTask} className="absolute top-0 right-2">
          x
        </button>
      </>
    </ModalCard>
  );
};

export default AddTask;
