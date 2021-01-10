import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, OnChanges, OnDestroy {
  socket: any;
  @Input() post: any;
  user: any;
  postItem: any;
  likeSub: Subscription;
  constructor(private postService: PostService,
              private tokenService: TokenService,
              private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.postItem = changes.post.currentValue;
  }

  ngOnDestroy() {
    if (this.likeSub) {
      this.likeSub.unsubscribe();
    }
  }

  likePost(post) {
    this.likeSub = this.postService.addLike(post).subscribe(data => {
      this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
  }

  checkInLikesArray(arr, username) {
    return _.some(arr, {username});
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  openCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }

}
