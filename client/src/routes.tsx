/* eslint-disable */
import React from 'react';
import PostsList from './components/PostList';
import Registration from './pages/Registration';
import PostPage from './components/PostPage';

export const routes = [
  {
    page: <PostsList />,
    path: '/',
  },
  {
    page: <Registration />,
    path: '/auth',
  },

  {
    page: <PostPage />,
    path: "/posts/:postId",
  },
];
