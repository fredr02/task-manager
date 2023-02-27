import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

const Login = () => {
  const emailField = useRef<HTMLInputElement>(null!);
  const passwordField = useRef<HTMLInputElement>(null!);

  const navigate = useNavigate();

  const logInHandler = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailField.current.value,
      passwordField.current.value
    )
      .then((user) => {
        navigate('/');
      })
      .catch((err) => {
        alert('Login Error, Try Again');
      });
  };
  return (
    <div className="relative mx-4 mt-10 flex h-screen max-w-md flex-col pt-4 sm:mx-auto">
      <img src={logo} />
      <h1 className="mt-8 text-center text-4xl text-white">
        Welcome, Please Log in
      </h1>
      <form onSubmit={logInHandler}>
        <input
          className="mt-4 block w-full rounded p-2"
          placeholder="Email"
          ref={emailField}
          type="text"
        />
        <input
          className="mt-2 block w-full rounded p-2"
          placeholder="Password"
          ref={passwordField}
          type="password"
        />
        <input
          type="submit"
          value="Log In"
          className="mx-auto mt-2 block rounded bg-primary p-3"
        />
      </form>
    </div>
  );
};

export default Login;
