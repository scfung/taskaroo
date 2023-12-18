import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TasksPage.css';
import EditTask from './EditTask';
import { addTask, editTask, completeTask } from './redux/actions'; // Ensure correct import paths

function TasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const completedTasks = useSelector(state => state.completedTasks);
  const [editingTask, setEditingTask] = useState(null); // Change to useState
    const createTask = () => {
        const description = prompt('Enter Task Description:');
        if (description === null) {
            return;
        }

        const newTask = {
            id: tasks.length + completedTasks.length + 1,
            status: 'Ongoing',
            description: description || 'Task Description'
        };

        dispatch(addTask(newTask));
    };

    const handleEditTask = () => {
      const taskId = prompt('Enter the ID of the task to edit:');
      if (taskId === null) {
          return;
      }

      const taskToEdit = tasks.find(task => task.id === Number(taskId));
      if (taskToEdit) {
          setEditingTask(taskToEdit); // Set the editing task
      } else {
          alert('Task not found!');
      }
  };

  const handleUpdateTask = (updatedTask) => {
      dispatch(editTask(updatedTask));
      setEditingTask(null); // Clear the editing task after update
  };

    const handleDeleteTask = () => {
      const taskId = prompt('Enter the ID of the task to complete:');
      if (taskId === null) {
          return;
      }
  
      dispatch(completeTask(Number(taskId)));
    };
  

    return React.createElement(
      'div',
      null,
      React.createElement('h2', { className: 'task-title' }, 'My Tasks'),
      React.createElement(
          'div',
          { className: 'tasks-page' },
          React.createElement(
              'div',
              { className: 'task-buttons' },
              React.createElement('button', { onClick: createTask }, 'Create Task'),
              editingTask && React.createElement(EditTask, { task: editingTask, updateTask: handleUpdateTask }),
              React.createElement('button', { onClick: handleEditTask }, 'Edit Task'),
              React.createElement('button', { onClick: handleDeleteTask }, 'Complete Task')
          ),
          React.createElement(
              'div',
              { className: 'tasks-list' },
              tasks.map(task =>
                  React.createElement(
                      'div',
                      { className: 'task-item', key: task.id },
                      React.createElement('span', null, task.id),
                      React.createElement('span', null, task.status),
                      React.createElement('span', null, task.description)
                  )
              )
          ),
      ),
      React.createElement('h2', { className: 'task-title' }, 'Completed Tasks'),
      React.createElement(
          'div',
          { className: 'tasks-list' },
          completedTasks.map(task =>
              React.createElement(
                  'div',
                  { className: 'task-item', key: task.id },
                  React.createElement('span', null, task.id),
                  React.createElement('span', null, task.status),
                  React.createElement('span', null, task.description)
              )
          )
      )
  );
}  

export default TasksPage;