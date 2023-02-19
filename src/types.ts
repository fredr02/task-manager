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

export type taskId = string;
