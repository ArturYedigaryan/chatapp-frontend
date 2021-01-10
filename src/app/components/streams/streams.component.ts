import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { TokenService } from './../../services/token.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: string;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
  }


}
