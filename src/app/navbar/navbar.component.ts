import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  logoutClicked: boolean;

  user: any;

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService) {

    }

    ngOnInit() {
      this.isLoggedIn = this.spotifyService.isLoggedIn() && this.youtubeService.isLoggedIn();
      if (this.isLoggedIn) {
        this.spotifyService.getUser().subscribe(user => {
          this.user =  user;
        });
      }
    }

    onClickLogout() {
      this.spotifyService.logout();
      this.youtubeService.logout();
      this.isLoggedIn = false;
      this.logoutClicked = true;
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    reloadPage() {
      window.location.reload();
    }
}
