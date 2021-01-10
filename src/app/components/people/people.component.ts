import { TokenService } from './../../services/token.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import io from 'socket.io-client';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;
  socket: any;
  constructor(private usersService: UsersService,
              private tokenService: TokenService
             ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload();
    this.getUsers();
    this.socket.on('refreshPage', () => {
      this.getUsers();
    });
  }


  getUsers() {
    this.usersService.getAllUsers().subscribe(data => {
      _.remove(data.users, {username: this.loggedInUser.username});
      this.users = data.users;
    });
  }

}
