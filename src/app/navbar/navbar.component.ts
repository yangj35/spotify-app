import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isLoggedIntoSpotify: boolean;
  spotifyLogoutClicked: boolean;

  user: any;

  constructor(
    private authService: AuthService,
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService) {

    }

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isLoggedIntoSpotify = this.spotifyService.isLoggedIn();
    }

    login() {
      this.authService.login();
    }

    logout() {
      this.authService.logout();
    }

    spotifyLogout() {
      this.spotifyService.logout();
      this.isLoggedIntoSpotify = false;
      this.spotifyLogoutClicked = true;
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    spotifyLogin() {
      this.spotifyService.requestAuthorization();
    }

    reloadPage() {
      window.location.reload();
    }
}
