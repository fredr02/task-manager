import React, { useEffect, useState } from 'react';

import Header from './Header';
import Tasklist from './Tasklist';
import Loading from './Loading';

const App = () => {
  useEffect(() => {
    (async () => {
      const data = await fetch('http://localhost:3131', { method: 'GET' });
      setTaskList(await data.json());
      setIsLoading(false);
    })();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="flex flex-col mt-4 max-w-md sm:mx-auto mx-4">
      {isLoading && <Loading />}

      {!isLoading && <Header tasks={taskList} />}
      {!isLoading && <Tasklist tasks={taskList} />}
    </div>
  );
};

export default App;
