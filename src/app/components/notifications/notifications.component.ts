import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import * as moment from 'moment';

import {TokenService} from './../../services/token.service';
import {UsersService} from './../../services/users.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socket: any;

  user: any;
  notifications = [];
  constructor(private tokenService: TokenService,
              private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {
    this.usersService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.user.notifications.reverse();
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markNotification(data) {
    this.usersService.markNotification(data._id).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

  deleteNotification(data) {
    this.usersService.markNotification(data._id, true).subscribe(value => {
      this.socket.emit('refresh', {});
    });
  }

}
