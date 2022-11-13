import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent implements OnInit {
  clientID: string;
  clientSecret: string;

  constructor(private spotifyService: SpotifyService) {

  }

  ngOnInit() {
    
  }

  onClick() {
    // this.spotifyService.getToken(this.clientID, this.clientSecret);
    this.spotifyService.requestAuthorization(this.clientID, this.clientSecret);
  }
}
