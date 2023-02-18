import { appState, task, taskId } from '../../types';

export type reducerAction = {
  type:
    | 'updateTask'
    | 'setTaskList'
    | 'changeFilter'
    | 'addTask'
    | 'deleteTask';
  payload: task[] | task | 'all' | 'active' | taskId;
};

const reducer = (state: appState, action: reducerAction): appState => {
  let taskAction = action.payload as task;
  let filterAction = action.payload as 'all' | 'active';
  let taskListAction = action.payload as task[];

  if (action.type === 'updateTask') {
    console.log('reducer!');
    const removedItemList = state.taskList.map((task: task) => {
      if (task.id == taskAction.id) return { ...taskAction };
      return { ...task };
    });

    return {
      ...state,
      taskList: removedItemList,
    };
  }
  if (action.type === 'setTaskList') {
    return { ...state, taskList: taskListAction };
  }
  if (action.type === 'addTask') {
    return {
      ...state,
      taskList: [...state.taskList, action.payload as task],
    };
  }
  if (action.type === 'deleteTask') {
    return {
      ...state,
      taskList: state.taskList.filter((task) => {
        if (task.id == action.payload) return false;
        return true;
      }),
    };
  } else if (action.type === 'changeFilter') {
    return {
      ...state,
      filter: filterAction,
    };
  }
  return state;
};

export default reducer;
