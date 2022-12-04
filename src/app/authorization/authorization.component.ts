import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService,) {

  }

  ngOnInit() {
    this.isLoggedIn = this.spotifyService.isLoggedIn() && this.youtubeService.isLoggedIn();
  }

  onClick() {
    this.spotifyService.requestAuthorization();
  }
}
