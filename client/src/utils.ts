/* eslint-disable */
export const storage = {
    get: (key: string) => JSON.parse(localStorage.getItem(key) as string),
    set: (key:string, item:any) => localStorage.setItem(key, JSON.stringify(item)),
  };