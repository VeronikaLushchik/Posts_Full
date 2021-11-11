/* eslint-disable */
import axios from 'axios';
import { storage } from '../utils';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use((req) => {
  if (req.headers && storage.get('profile')) {
    req.headers.authorization = `Bearer ${storage.get('profile').token}`;
  }

  return req;
});

instance.interceptors.response.use((config) => {
  return config;
},async (error) => {
  
  const originalRequest = error.config;
    try {
      const response = await axios.get('http://localhost:8080/api/users/refresh', {withCredentials: true})
      let obj = storage.get('profile')
      obj = JSON.stringify({...obj, token: response.data['token']})
      storage.set('profile', obj);
      return instance.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗИРОВАН')
    }
  }
)

type Method = 'get' | 'post' | 'delete';

const makeRequest = (method:Method, url:string, params:{}) => {
  return instance[method](`${url}`, params);
};

const request = (method:Method, url:string) => {
  return (params = {}) => makeRequest(method, url, params);
};

export const postApi = {
  removePost: (postId:number) => request('delete', `/posts/${postId}`)(),
  getPosts: request('get', '/posts'),
  getPostComments: (postId:number) => request('get', `/posts/${postId}/comments`)(),
  getPost: (id:number) => request('get', `/posts/${id}`)(),
  addPost: (newPost: Post) => request('post', '/posts')(newPost),
  addComment: (newComment: Comment, postId:number) => request('post', `/posts/${postId}/commentPost`)(newComment),
  signIn: (formData: User) => request('post', '/users/singin')(formData),
  signUp: (formData: User) => request('post', '/users/singup')(formData),
};
