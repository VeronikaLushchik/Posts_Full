/* eslint-disable */
import axios from 'axios';

export const storage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) as string),
  set: (key:string, item:any) => localStorage.setItem(key, JSON.stringify(item)),
};

export const checkToken = async (exp:any) => {
  try {
    if (new Date().getTime() / 1000 - 1000 < exp) {
      const response = await axios.get('http://localhost:8080/api/users/refresh', { withCredentials: true });
      storage.set('token', response.data['token'] );
    }
  }
  catch (err) {
    console.log(err)
  }
};
