import React, { SetStateAction } from 'react';
import ModalCard from './ModalCard';

type AddTaskProps = {
  flipAddTask: () => void;
};

const AddTask = ({ flipAddTask }: AddTaskProps) => {
  return (
    <ModalCard>
      <>
        <form>
          <input placeholder="Todo Name"></input>
          <button>Add</button>
        </form>

        <button onClick={flipAddTask} className="absolute top-0 right-2">
          x
        </button>
      </>
    </ModalCard>
  );
};

export default AddTask;
