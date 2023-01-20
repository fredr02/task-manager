import React, { useEffect, useState } from 'react';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';

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
    <div className="flex flex-col mt-4 max-w-md sm:mx-auto mx-4">
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
    </div>
  );
};

export default App;
