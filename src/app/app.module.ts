import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { UserProfileComponent } from './user/user-profile.component';

import { SpotifyService } from './services/spotify.service';
import { YoutubeService } from './services/youtube.service';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AlbumComponent,
    ArtistComponent,
    AuthorizationComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    TrackComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    SpotifyService,
    YoutubeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
