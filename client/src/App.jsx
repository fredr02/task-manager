import React, { useEffect, useState } from 'react';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';
import { MdAddTask } from 'react-icons/md';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [taskList, setTaskList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [filter]);

  useEffect(() => {
    filterData(filter || 'all');
  }, [taskList]);

  const fetchData = async () => {
    const data = await fetch(import.meta.env.VITE_API_BASE, {
      method: 'GET',
    });
    const tasks = await data.json();

    setTaskList(tasks);
    filterData(filter || 'all', tasks);
  };

  const filterData = (filter) => {
    const sortedTasks = taskList.sort((a, b) => a.isComplete - b.isComplete);

    filter == 'all' && setFilteredTasks(sortedTasks);
    filter == 'active' &&
      setFilteredTasks(sortedTasks.filter((task) => !task.isComplete));
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/${updatedTask._id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...updatedTask }),
      }
    );

    setTaskList((prevTaskList) => {
      const newList = prevTaskList.map((task) => {
        if (task._id == updatedTask._id) return { ...updatedTask };
        return { ...task };
      });
      filterData(filter, newList);
      return newList;
    });
  };

  return (
    <div className="flex flex-col mt-4 max-w-md sm:mx-auto mx-4 relative">
      {isLoading && <Loading />}

      {!isLoading && <Header tasks={taskList} />}
      {!isLoading && (
        <Tasklist
          tasks={filteredTasks}
          filter={filter}
          setFilter={setFilter}
          updateTask={updateTask}
        />
      )}
      <button className="flex justify-around items-center text-white bg-primary hover:bg-[#4C78EE] w-[4rem] h-[4rem] text-center text-2xl  m-3 rounded-full leading-none self-center fixed bottom-0">
        <MdAddTask />
      </button>
    </div>
  );
};

export default App;
