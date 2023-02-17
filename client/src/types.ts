export type appState = {
  taskList: task[];
  filter: 'all' | 'active';
};

export interface task {
  id: string;
  name: string;
  isComplete: boolean;
}
