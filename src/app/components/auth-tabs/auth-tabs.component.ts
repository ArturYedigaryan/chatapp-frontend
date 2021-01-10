import { Component, OnInit,  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit , AfterViewInit{
  @ViewChild('tab') tabRef: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    M.Tabs.init(this.tabRef.nativeElement, {});
  }

}
