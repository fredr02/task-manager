export type appState = {
  taskList: task[];
  filter: 'all' | 'active';
};

export type task = {
  _id: { $oid: string };
  name: string;
  isComplete: boolean;
};
