/* eslint-disable */
import React from 'react';
import PostsList from './components/PostList';
import Registration from './pages/Registration';
import PostPage from './components/PostPage';
import { Redirect } from 'react-router-dom';

export const privetRoutes = [
  {
    page: <PostsList />,
    path: '/posts',
  },

  {
    page: <PostPage />,
    path: "/posts/:postId",
  },
  {
    page: <Redirect to="/posts" />,
    path: '/',
  }
];

export const publicRoutes = [
  {
    page: <Registration />,
    path: '/auth',
  },
  {
    page: <Redirect to="/auth" />,
    path: '/',
  }
];

