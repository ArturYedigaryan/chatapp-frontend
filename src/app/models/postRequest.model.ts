export class PostRequest {
  message: string;
  post: Post;
}


export interface Post {
  comments: [];
  created: string;
  likes: [];
  post: string;
  totalLikes: number;
  user: string;
  username: string;
}
