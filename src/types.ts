export type appState = {
  taskList: task[];
  filter: 'all' | 'active';
};

export type task {
  id: taskId;
  name: string;
  isComplete: boolean;
}

export type taskId = string;