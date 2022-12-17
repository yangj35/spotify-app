import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlaylistComponent } from './playlists/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { TrackTableComponent } from './common/track-table.component';
import { UserProfileComponent } from './user/user-profile.component';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { SpotifyService } from './services/spotify.service';
import { YoutubeService } from './services/youtube.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AlbumComponent,
    ArtistComponent,
    AuthorizationComponent,
    HomeComponent,
    MessagingComponent,
    NavbarComponent,
    PlaylistComponent,
    PlaylistsComponent,
    SearchComponent,
    TrackComponent,
    TrackTableComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
    DataService,
    SpotifyService,
    YoutubeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
