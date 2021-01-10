import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-private-user',
  templateUrl: './private-user.component.html',
  styleUrls: ['./private-user.component.css']
})
export class PrivateUserComponent implements OnInit, AfterViewInit {
  tabElement: any;
  constructor() { }

  ngOnInit(): void {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }


}
