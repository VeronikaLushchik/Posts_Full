import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
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
  getPosts: request('get', '/posts'),
  getPostComments: (postId:number) => request('get', `/posts/${postId}/comments`)(),
  getPost: (id:number) => request('get', `/posts/${id}`)(),
  addPost: (newPost: Post) => request('post', '/posts')(newPost),
  addComment: (newComment: Comment, postId:number) => request('post', `/posts/${postId}/commentPost`)(newComment),
};
