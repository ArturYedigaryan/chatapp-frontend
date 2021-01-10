import { Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { MessageService } from './../../services/message.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import { NgxAutoScroll } from 'ngx-auto-scroll';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;
  @Input() users;
  receiver: string;
  receiverData: any;
  user: any;
  message = '';
  messagesArr = [];
  socket: any;
  typingMessage;
  typing = false;
  isOnline = false;

  toggled = false;
  selectedEmoji: any;

  userOnlineSub: Subscription;
  getUserByNameSub: Subscription;
  getMessageSub: Subscription;
  sendMessageSub: Subscription;
  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.getUserByUsername(this.receiver);

      this.socket.on('refreshPage', () => {
        this.getUserByUsername(this.receiver);
      });
    });

    this.userOnlineSub = this.usersService.onlineUsers.subscribe(data => {
      const title = document.querySelector('.nameCol');
      if (data.length) {
        const result = _.indexOf(data, this.receiver);
        if (result > -1 ) {
          this.isOnline = true;
          (title as HTMLElement).style.marginTop = '10px';
        } else {
          this.isOnline = false;
          (title as HTMLElement).style.marginTop = '20px';
        }
      }
    });

    this.socket.on('is_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });

  }

  ngOnDestroy() {
    if (this.userOnlineSub) {
      this.userOnlineSub.unsubscribe();
    }

    if (this.getUserByNameSub) {
      this.getUserByNameSub.unsubscribe();
    }

    if (this.getMessageSub) {
      this.getMessageSub.unsubscribe();
    }

    if (this.sendMessageSub) {
      this.sendMessageSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const params = {
      roo1: this.user.username,
      roo2: this.receiver
    };

    this.socket.emit('join chat', params);
  }

  select($event){
    this.selectedEmoji = $event.emoji.native;
    this.message += this.selectedEmoji;
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    });
    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }
    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      });
    }, 500);
  }

  forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
  }

  getMessages(senderId, receiverId) {
    this.getMessageSub = this.msgService.getAllMessage(senderId, receiverId).subscribe(data => {
      this.messagesArr = data.messages.message;
    });
  }

  getUserByUsername(name) {
    this.getUserByNameSub = this.usersService.getUserByName(name).subscribe(data => {
      this.receiverData = data.user;
      this.getMessages(this.user._id, this.receiverData._id);
    });
  }

  sendMessage() {
    if (this.message) {
      this.sendMessageSub = this.msgService
        .sendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe( data => {
          this.socket.emit('refresh', {});
          this.message = '';
          this.toggled = false;
         });
    }
  }

}
