import React, { useState } from 'react';
import Router from 'next/router';
import BaseLayout from '../../components/base-layout';
import axios from 'axios';
import useRequest from '../../hooks/use-request';

export default function signup({ currentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <BaseLayout currentUser={currentUser.currentUser}>
      <div className='w-full max-w-xs'>
        <form
          onSubmit={onSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-gray-900 text-xl font-bold my-2 text-center'>
            Sign In
          </h2>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='text'
              placeholder='Email'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-red-500 text-xs italic hidden'>
              Please choose a password.
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <input
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              value='Submit'
            />

            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
            >
              Forgot Password?
            </a>
          </div>
          <>{errors}</>
        </form>
      </div>
    </BaseLayout>
  );
}

export async function getServerSideProps({ req }) {
  const { data: currentUser } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      withCredentials: true,
      headers: req.headers,
    }
  );
  return { props: { currentUser } };
}
