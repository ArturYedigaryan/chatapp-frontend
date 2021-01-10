import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from '../components/streams/streams.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { PostItemComponent } from '../components/post-item/post-item.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { PrivateUserComponent } from '../components/private-user/private-user.component';
import { PeopleItemComponent } from '../components/people-item/people-item.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';



@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    PostItemComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserComponent,
    PrivateUserComponent,
    PeopleItemComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgxAutoScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StreamsRoutingModule,
    PickerModule,
    EmojiModule
  ],
  providers: []
})
export class StreamsModule { }
