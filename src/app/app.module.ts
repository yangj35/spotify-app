import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SearchComponent } from './home/search/search.component';
import { TrackComponent } from './track/track.component';

import { SpotifyService } from './services/spotify.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ArtistComponent,
    AuthorizationComponent,
    NavbarComponent,
    SearchComponent,
    TrackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
