import { PostService } from './../../services/post.service';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  commentForm: FormGroup;
  socket: any;
  postId: any;
  post: string;
  commentsArr = [];
  constructor(private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
    this.route.params.subscribe((params: Params) => {
      this.postId = params.id;
      return this.getPostById();
    });
    this.socket.on('refreshPage', (data) => {
      this.getPostById();
    });
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  addComment() {
    this.postService.addNewComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });

  }

  getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data.post.post;
      this.commentsArr = data.post.comments.reverse();
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }


}
