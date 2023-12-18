export const setWelcomeMessage = (message) => ({
    type: 'SET_WELCOME_MESSAGE',
    payload: message,
});
  
export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    payload: isLoggedIn,
});

export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const editTask = (task) => ({
  type: 'EDIT_TASK',
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const completeTask = (task) => ({
  type: 'COMPLETE_TASK',
  payload: task,
});

  