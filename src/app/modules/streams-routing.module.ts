import { PrivateUserComponent } from './../components/private-user/private-user.component';
import { ChatComponent } from './../components/chat/chat.component';
import { NotificationsComponent } from './../components/notifications/notifications.component';
import { FollowersComponent } from './../components/followers/followers.component';
import { FollowingComponent } from './../components/following/following.component';
import { PeopleComponent } from './../components/people/people.component';
import { PostsComponent } from './../components/posts/posts.component';
import { CommentsComponent } from './../components/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '', component: StreamsComponent, children: [
      {
        path: 'streams', pathMatch: 'full',
        component: PostsComponent
      },
      {
        path: 'post/:id',
        component: CommentsComponent
      },
      {
        path: 'people',
        component: PeopleComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'images/:name',
        component: ImagesComponent
      },
      {
        path: 'account/password',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: '', component: PrivateUserComponent, children: [
      {
        path: 'chat/:name',
        component: ChatComponent
      },
      {
        path: ':name',
        component: ViewUserComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'streams'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StreamsRoutingModule { }
