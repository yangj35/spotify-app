import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIntoSpotify: boolean;
  logoutClicked: boolean;

  user: any;

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService) {

    }

    ngOnInit() {
      this.isLoggedIntoSpotify = this.spotifyService.isLoggedIn();
    }

    onClickLogout() {
      this.spotifyService.logout();
      this.isLoggedIntoSpotify = false;
      this.logoutClicked = true;
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    onClickLogin() {
      this.spotifyService.requestAuthorization();
    }

    reloadPage() {
      window.location.reload();
    }
}
