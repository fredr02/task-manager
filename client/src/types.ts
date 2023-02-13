export type appState = {
  taskList: task[];
  filter: 'all' | 'active';
};

export interface task {
  _id: { $oid: string };
  name: string;
  isComplete: boolean;
}
