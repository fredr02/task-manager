export type appState = {
  taskList: task[];
  filter: 'all' | 'active';
};

export type task = {
  id: taskId;
  name: string;
  isComplete: boolean;
  description: string;
  time: string;
};

export type taskChange = {
  addTask: (task: task) => void;
  updateTask: (updatedTask: task) => void;
  deleteTask: (taskId: taskId) => void;
};

export type taskId = string;
