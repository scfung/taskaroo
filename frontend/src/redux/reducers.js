import initialState from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WELCOME_MESSAGE':
      return {
        ...state,
        welcomeMessage: action.payload,
      };
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'COMPLETE_TASK':
      const completedTask = state.tasks.find(task => task.id === action.payload);
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        completedTasks: [...state.completedTasks, { ...completedTask, status: 'Completed' }],
      };
      
      default:
      return state;
  }
};

export default rootReducer;
