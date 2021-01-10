import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRequest } from '../models/postRequest.model';
const BASEURL = 'http://localhost:3000/api/chatapp';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  addPost(body): Observable<PostRequest> {
    return this.http.post<PostRequest>(`${BASEURL}/posts/add-post`, body);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }

  getAllTopPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts-top`);
  }

  addLike(body): Observable<PostRequest> {
    return this.http.post<PostRequest>(`${BASEURL}/posts/add-like`, body);
  }

  addNewComment(postId, comment): Observable<PostRequest> {
    return this.http.post<PostRequest>(`${BASEURL}/posts/add-comment`, {
      postId,
      comment
    });
  }

  getPost(id): Observable<any> {
    return this.http.get(`${BASEURL}/posts/${id}`);
  }


}
