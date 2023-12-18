import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setWelcomeMessage, setIsLoggedIn } from './redux/actions';
import SignInSignUpPage from './SignInSignUpPage';

function ContentWithLocation() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const welcomeMessage = useSelector(state => state.welcomeMessage);

    const signIn = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Sign In Success:', data);
                dispatch(setIsLoggedIn(true));
                navigate('/tasks');
            } else {
                console.error('Sign In Failed:', data);
            }
        } catch (error) {
            console.error('Sign In Error:', error);
        }
    };

    const signUp = async (email, username, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Sign Up Success:', data);
                dispatch(setIsLoggedIn(true));
                navigate('/tasks');
            } else {
                console.error('Sign Up Failed:', data);
            }
        } catch (error) {
            console.error('Sign Up Error:', error);
        }
    };

    useEffect(() => {
        const messages = [
          "Welcome to Taskaroo!",
          "Hello, and welcome!",
          "Greetings from Taskaroo!",
          "Welcome back to your task manager!",
          "Hello! Ready to organize your day?",
          "Welcome! Let's be productive today.",
          "Good to see you again at Taskaroo!",
          "Welcome! Your tasks await.",
          "Hello! Dive into your tasks for today.",
          "Welcome! Let's tackle your to-do list."
        ];
        if (location.pathname === '/') {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            dispatch(setWelcomeMessage(randomMessage));
        }
    }, [location, dispatch]);

    const handleGetStartedClick = () => {
        navigate('/signin');
    };

    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(
          'div',
          { className: 'top-bar' },
          React.createElement(
              'h1',
              { className: 'app-name' },
              'Taskaroo'
          )
      ),
      React.createElement(
          'div',
          { className: 'buttons-container' },
          React.createElement(
              Link,
              { to: '/' },
              React.createElement(
                  'button',
                  { className: 'link-button' },
                  'Home'
              )
          ),
          isLoggedIn && React.createElement(
              Link,
              { to: '/tasks' },
              React.createElement(
                  'button',
                  { className: 'link-button' },
                  'Tasks'
              )
          ),
          React.createElement(
              Link,
              { to: '/signin' },
              React.createElement(
                  'button',
                  { className: 'link-button' },
                  'Sign In/Sign Up'
              )
          )
      ),
      location.pathname === '/' && React.createElement(
          'div',
          null,
          React.createElement(
              'div',
              { className: 'welcome-message' },
              React.createElement(
                  'b',
                  null,
                  welcomeMessage
              )
          ),
          React.createElement(
              'button',
              { className: 'get-started-button', onClick: handleGetStartedClick },
              'Get Started'
          )
      ),
      React.createElement(
          Routes,
          null,
          React.createElement(
              Route,
              { path: '/signin', element: React.createElement(SignInSignUpPage, { signIn: signIn, signUp: signUp }) }
          )
      )
  );
}

export default ContentWithLocation;