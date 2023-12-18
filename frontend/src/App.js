import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import Redux store
import SignInSignUpPage from './SignInSignUpPage';
import './App.css';
import TasksPage from './TasksPage';
import ContentWithLocation from './ContentWithLocation';

function App() {
  
  return React.createElement(
    Provider, // Wrap app in the Redux Provider
    { store },
    React.createElement(
      Router,
      null,
      React.createElement(
        'div',
        { className: 'App' },
        React.createElement(ContentWithLocation, null), // Removed props as they will be managed by Redux
        React.createElement(
          Routes,
          null,
          React.createElement(Route, { path: '/signin', element: React.createElement(SignInSignUpPage, null) }),
          React.createElement(Route, { path: '/tasks', element: React.createElement(TasksPage, null) })
        )
      )
    )
  );
}

export default App;
