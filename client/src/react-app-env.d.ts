/// <reference types="react-scripts" />
interface Post {
    _id?: number;
    userId?: number;
    title: string;
    body: string;
    comments: [Partial<Comment>]
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
    comments: Comment[],
    comment: Partial<Comment> | null,
    query: string,
    select: string,
    page: string,
    view: string,
    favorite: number[],
    isFetching: boolean,
    isFetchingPost: boolean,
  };
  