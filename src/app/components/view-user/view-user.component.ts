import { Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tab') tabRef: ElementRef;
  postsTab = false;
  followingsTab = false;
  followersTab = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  name: any;
  socket: any;
  userSub: Subscription;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.postsTab = true;
    this.route.params.subscribe(params => {
      this.name = params.name;
      this.getUserData(this.name);
    });

    this.socket.on('refreshPage', (data) => {
      this.getUserData(this.name);
    });
  }

  ngAfterViewInit() {
    M.Tabs.init(this.tabRef.nativeElement, {});
  }

  ngOnDestroy() {
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  getUserData(name) {
    this.userSub = this.usersService.getUserByName(name).subscribe(data => {
      this.posts = data.user.posts;
      const picId = data.user.picId;
      const picVersion = data.user.picVersion;
      for (const i of this.posts) {
        i.postId.picId = picId;
        i.postId.picVersion = picVersion;
      }
      this.posts.reverse();
      this.followers = data.user.followers;
      this.following = data.user.following;
    }, err => console.log(err));
  }

  changeTab(tab) {
    if (tab === 'posts') {
      this.postsTab = true;
      this.followingsTab = false;
      this.followersTab = false;
    }

    if (tab === 'following') {
      this.postsTab = false;
      this.followingsTab = true;
      this.followersTab = false;
    }

    if (tab === 'followers') {
      this.postsTab = false;
      this.followingsTab = false;
      this.followersTab = true;
    }
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

}
