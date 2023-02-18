import useTaskManager from './useTaskManager';

import AddTask from './AddTask';
import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';
import { MdAddTask } from 'react-icons/md';

const App = () => {
  const {
    showAddTask,
    addTask,
    deleteTask,
    updateTask,
    changeFilter,
    flipAddTask,
    isLoading,
    state,
  } = useTaskManager();
  return (
    <div className="relative mx-4 flex h-screen max-w-md flex-col pt-4 sm:mx-auto">
      {isLoading && <Loading />}

      {!isLoading && (
        <Header tasks={state.taskList!} flipAddTask={flipAddTask} />
      )}
      {!isLoading && (
        <Tasklist
          originalTasks={state.taskList!}
          filter={state.filter}
          changeFilter={changeFilter}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
      <button
        onClick={flipAddTask}
        className="fixed bottom-0 m-3 flex h-[4rem] w-[4rem] items-center justify-around self-center rounded-full  bg-primary text-center text-2xl leading-none text-white hover:bg-[#4C78EE] sm:hidden"
      >
        <MdAddTask />
      </button>
      {showAddTask ? (
        <AddTask addTask={addTask} flipAddTask={flipAddTask} />
      ) : null}
    </div>
  );
};

export default App;