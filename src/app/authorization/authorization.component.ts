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

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService,) {

  }

  ngOnInit() {
    
  }

  onClick() {
    this.spotifyService.requestAuthorization(this.clientID, this.clientSecret);
    this.youtubeService.requestAuthorization(this.apiKey);
  }
}
