/* eslint-disable */
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { logout } from '../redux/actions/authActions';
import { store } from '../redux/store';
import { checkToken, storage } from '../utils';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use(req => {
  if (req.headers && storage.get('token')) {
    req.headers.authorization = `Bearer ${storage.get('token')}`;
    const token = storage.get('token');
    const { exp }:any = decodeToken(token);
    checkToken(exp);
  }
    return req;
  });

instance.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  store.dispatch(logout()) 
 }
 return error;
});

type Method = 'get' | 'post' | 'delete';

const makeRequest = (method:Method, url:string, params:{}) => {
  return instance[method](`${url}`, params);
};

const request = (method:Method, url:string) => {
  return (params = {}) => makeRequest(method, url, params);
};

export const postApi = {
  removePost: (postId:number) => request('delete', `/posts/${postId}`)(),
  getPosts: (page:string, limit:string, order:string, query:string ) => request('get', `/posts?page=${page}&limit=${limit}&OrderBy=${order}&searchQuery=${query}`)(),
  getPostComments: (postId:number) => request('get', `/posts/${postId}/comments`)(),
  getPost: (id:number) => request('get', `/posts/${id}`)(),
  addPost: (newPost: Post) => request('post', '/posts')(newPost),
  addComment: (newComment: Comment, postId:number) => request('post', `/posts/${postId}/commentPost`)(newComment),
};

export const authApi = {
  signIn: (formData: User) => request('post', '/users/singin')(formData),
  signUp: (formData: User) => request('post', '/users/singup')(formData),
  getUser: (token: string) => request('get', '/users/profile')(token),
};
