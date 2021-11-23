/// <reference types="react-scripts" />
interface Post {
    _id?: number;
    userId?: number;
    title: string;
    body: string;
    comments: [Partial<Comment>] | []
  }
  
  interface Comment {
    name: string;
    postId?: string;
    email: string;
    body:string;
  }

  type RootState = {
    posts: Post[],
    post: Partial<Post> | null;
    comment: Partial<Comment> | null,
    query: string,
    select: string,
    page: string,
    view: string,
    favorite: number[],
    isFetching: boolean,
    isFetchingPost: boolean,
    count: number | null,
  };

  interface User {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    photo?: string;
  }

type authState = {
    authData: any,
    loading: boolean,
    errors: string | null,
  };
  