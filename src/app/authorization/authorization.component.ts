import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent implements OnInit {
  clientID: string;
  clientSecret: string;
  apiKey: string;

  allFilled: boolean;
  isLoggedIn: boolean;

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService,) {

  }

  ngOnInit() {
    this.isLoggedIn = this.spotifyService.isLoggedIn() && this.youtubeService.isLoggedIn();
  }

  onClick() {
    this.allFilled = (this.clientSecret && this.clientID && this.apiKey) ? true : false;
    if (this.allFilled) {
      this.spotifyService.requestAuthorization(this.clientID, this.clientSecret);
      this.youtubeService.requestAuthorization(this.apiKey);
    }
  }
}
