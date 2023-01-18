import React from 'react';

import Header from './Header';
import Tasklist from './Tasklist';

const App = () => {
  return (
    <div className="flex flex-col mt-4 max-w-md mx-auto">
      <Header />
      <Tasklist />
    </div>
  );
};

export default App;
