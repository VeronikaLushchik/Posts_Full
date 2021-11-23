/* eslint-disable */
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import { storage } from '../utils';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use(async (req) => {
  if (req.headers && storage.get('profile')) {
    req.headers.authorization = `Bearer ${storage.get('profile').token}`;
    const { token } = storage.get('profile');
    const { exp }:any = decodeToken(token);
// TODO вынести отдельно
    if (new Date().getTime() / 1000 - 1000 < exp) {
      const response = await axios.get('http://localhost:8080/api/users/refresh', { withCredentials: true });

      storage.set('profile', { ...storage.get('profile'), token: response.data['token'] });
    }
  }

  return req;
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
};
