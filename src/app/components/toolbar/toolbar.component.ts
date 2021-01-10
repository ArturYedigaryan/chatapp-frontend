import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { faGlobe, faBell } from '@fortawesome/free-solid-svg-icons';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MessageService } from './../../services/message.service';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
  faGlobe = faGlobe;
  faBell = faBell;
  @ViewChild('dropNotification') dropNotificationRef: ElementRef;
  @ViewChild('dropMessage') dropMessageRef: ElementRef;
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: any;
  imageVersion: any;
  getUserSub: Subscription;

  constructor(private tokenService: TokenService,
              private router: Router,
              private usersServices: UsersService,
              private msgService: MessageService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
    this.socket.emit('online', {room: 'global', user: this.user.username});
  }

  ngAfterViewInit() {
    M.Dropdown.init(this.dropNotificationRef.nativeElement, {
      argument: 'right',
      hover: true,
      coverTrigger: false
    });
    M.Dropdown.init(this.dropMessageRef.nativeElement, {
      argument: 'right',
      hover: true,
      coverTrigger: false
    });

    this.socket.on('usersOnline', (data) => {
      this.usersServices.onlineUsers.next(data);
    });
  }

  ngOnDestroy() {
    if (this.getUserSub) {
      this.getUserSub.unsubscribe();
    }
  }

  getUser() {
    this.getUserSub = this.usersServices.getUserById(this.user._id).subscribe(data => {
      this.imageId = data.user.picId;
      this.imageVersion = data.user.picVersion;
      this.notifications = data.user.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
      this.chatList = data.user.chatList;
      this.checkIfRead(this.chatList);
    }, err => {
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  checkIfRead(arr) {
    const checkArr = [];
    for (const item of arr ) {
      const receiver = item.msgId.message[item.msgId.message.length - 1];
      if (this.router.url !== `/chat/${receiver.senderName}`) {
        if (receiver.isRead === false && receiver.receiverName === this.user.username) {
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }

  goToHome() {
    this.router.navigate(['streams']);
  }

  markAll() {
    this.usersServices.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  messageDate(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    });
  }

  goToChatPage(name) {
    this.router.navigate(['chat', name]);
    this.msgService.markMessages(this.user.username, name).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  markAllMessages() {
    this.msgService.markAllMessages().subscribe(data => {
      this.socket.emit('refresh', {});
      this.msgNumber = 0;
    });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/auth']);
  }

}
