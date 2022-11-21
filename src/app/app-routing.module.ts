import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { TrackComponent } from './track/track.component';
import { UserProfileComponent } from './user/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'artist/:id', component: ArtistComponent},
  { path: 'album/:id', component: AlbumComponent},
  { path: 'track/:id', component: TrackComponent},
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
