import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './home/search/search.component';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'artist/:id', component: ArtistComponent},
  { path: 'album/:id', component: AlbumComponent},
  { path: 'track/:id', component: TrackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
