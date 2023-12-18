import React, { useState } from 'react';
import './SignInSignUpPage.css';

function SignInSignUpPage({ signIn, signUp }) {
  // State for Sign In Form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // State for Sign Up Form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn(signInEmail, signInPassword);
    setSignInEmail('');
    setSignInPassword('');
  };

  const isValidEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(signUpEmail) || !signUpUsername || !signUpPassword) {
      alert('Please enter a valid email, username, and password.');
      return;
    }
    signUp(signUpEmail, signUpUsername, signUpPassword);
    setSignUpUsername('');
    setSignUpPassword('');
  };

  return React.createElement(
    'div', 
    { className: 'centered-container' },
    React.createElement(
      'div',
      { className: 'sign-in-sign-up-container' },
      // Sign In Form
      React.createElement(
        'div',
        { className: 'sign-in-box' },
        React.createElement(
          'form',
          { onSubmit: handleSignInSubmit },
          React.createElement('h2', null, 'Sign In'),
          React.createElement('input', {
            type: 'email',
            placeholder: 'Email',
            value: signInEmail,
            onChange: (e) => setSignInEmail(e.target.value)
          }),
          React.createElement('input', {
            type: 'password',
            placeholder: 'Password',
            value: signInPassword,
            onChange: (e) => setSignInPassword(e.target.value)
          }),
          React.createElement('button', { type: 'submit' }, 'Sign In')
        )
      ),
      // Sign Up Form
      React.createElement(
        'div',
        { className: 'sign-up-box' },
        React.createElement(
          'form',
          { onSubmit: handleSignUpSubmit },
          React.createElement('h2', null, 'Sign Up'),
          React.createElement('input', {
            type: 'email', // Changed to 'email' type
            placeholder: 'Email',
            value: signUpEmail,
            onChange: (e) => setSignUpEmail(e.target.value) // Use setSignUpEmail to update state
          }),
          React.createElement('input', {
            type: 'text',
            placeholder: 'Username',
            value: signUpUsername,
            onChange: (e) => setSignUpUsername(e.target.value)
          }),
          React.createElement('input', {
            type: 'password',
            placeholder: 'Password',
            value: signUpPassword,
            onChange: (e) => setSignUpPassword(e.target.value)
          }),
          React.createElement('button', { type: 'submit' }, 'Sign Up')
        )
      )
    )
  );
}

export default SignInSignUpPage;
