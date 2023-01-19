import React, { useEffect, useState } from 'react';

import Header from './Header';
import Tasklist from './Tasklist';

const App = () => {
  const [taskList, setTaskList] = useState([
    {
      _id: '63c8854ebe8caa0a5094d449',
      name: 'Watch Movie',
      __v: 0,
    },
    {
      _id: '63c8854fbe8caa0a5094d44b',
      name: 'Work',
      __v: 0,
    },
    {
      _id: '63c88551be8caa0a5094d44d',
      name: 'Kiss Wife',
      __v: 0,
    },
    {
      _id: '63c88554be8caa0a5094d44f',
      name: 'Eat Kids',
      __v: 0,
    },
  ]);

  return (
    <div className="flex flex-col mt-4 max-w-md sm:mx-auto mx-4">
      <Header />
      <Tasklist tasks={taskList} />
    </div>
  );
};

export default App;
