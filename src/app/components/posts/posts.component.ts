import { Subscription } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as M from 'materialize-css';
import io from 'socket.io-client';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tab') tabRef: ElementRef;
  topStreamsTab = false;
  streamsTab = false;
  socket: any;
  posts = [];
  topPosts = [];
  topPostsSub: Subscription;
  postsSub: Subscription;
  constructor(private postService: PostService,
              private tokenService: TokenService,
              private router: Router) {
    this.socket = io('http://localhost:3000');
}

  ngOnInit(): void {
    this.streamsTab = true;
    this.allPosts();
    this.allTopPosts();
    this.socket.on('refreshPage', (data) => {
      this.allPosts();
      this.allTopPosts();
    });
  }

  ngAfterViewInit() {
    M.Tabs.init(this.tabRef.nativeElement, {});
  }

  changeTabs(value){
    if (value === 'streams') {
      this.streamsTab = true;
      this.topStreamsTab = false;
    }

    if (value === 'top') {
      this.streamsTab = false;
      this.topStreamsTab = true;
    }
  }

  allPosts() {
    this.postsSub = this.postService.getAllPosts().subscribe(
      data => {
        this.posts = data.posts;
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  allTopPosts() {
    this.topPostsSub = this.postService.getAllTopPosts().subscribe(
      data => {
        this.topPosts = data.top;
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }

    if (this.topPostsSub) {
      this.topPostsSub.unsubscribe();
    }
  }


}
