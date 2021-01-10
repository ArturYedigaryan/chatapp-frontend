import { UsersService } from './../../services/users.service';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  socket: any;
  following = [];
  user: any;

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
      this.following = data.user.following;
    }, err => console.log(err));
  }

  unFollow(user) {
    this.usersService.unFollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

}
