import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import io from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.css']
})
export class PeopleItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input()user: any;
  faCircle = faCircle;
  onlineUsers = [];
  usersArr = [];
  socket: any;
  loggedInUser: any;
  isYou = false;
  onlineSub: Subscription;
  followSub: Subscription;
  notificationSub: Subscription;
  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.getOnlineUser();
    this.socket.on('refreshPage', () => {
      this.getOnlineUser();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loggedInUser = this.tokenService.GetPayload();

    this.usersArr = changes.user.currentValue.followers;
    if (this.loggedInUser._id === changes.user.currentValue._id) {
      this.isYou = false;
    } else {
      this.isYou = true;
    }
  }

  ngOnDestroy() {
    if (this.onlineSub) {
      this.onlineSub.unsubscribe();
    }

    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }

    if (this.followSub) {
      this.followSub.unsubscribe();
    }
  }

  getOnlineUser() {
    this.onlineSub = this.usersService.onlineUsers.subscribe( data => {
      this.onlineUsers = data;
    });
  }

  followUser(event) {
    event.stopPropagation();
    this.followSub = this.usersService.followUser(this.user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  checkInArr() {
    const result = _.find(this.usersArr, ['follower._id', this.loggedInUser._id]);
    const currentUser = _.find(this.usersArr, ['follower', this.loggedInUser._id]);
    if (result || currentUser) {
      return true;
    } else {
      return false;
    }
  }


  checkIfOnline() {
    const result = _.indexOf(this.onlineUsers, this.user.username);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }

  viewUser(event) {
    this.router.navigate([this.user.username]);
    if (this.loggedInUser.username !== this.user.username) {
      this.notificationSub = this.usersService.profileNotifications(this.user._id).subscribe(
        data => {
          this.socket.emit('refresh', {});
        },
        err => console.log(err)
      );
    }
  }

}
