import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';
import { PlaylistComponent } from './playlists/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TrackComponent } from './track/track.component';
import { UserProfileComponent } from './user/user-profile.component';
import { MessagingHomeComponent } from './messaging/messaging-home.component'
import { NewUserComponent } from './authorization/new-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'artist/:id', component: ArtistComponent},
  { path: 'album/:id', component: AlbumComponent},
  { path: 'track/:id', component: TrackComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'messaging-home', component: MessagingHomeComponent },
  { path: 'messaging', component: MessagingComponent},
  { path: 'new-user', component: NewUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
