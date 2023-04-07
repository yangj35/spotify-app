import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private spotifyService: SpotifyService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.spotifyService.isLoggedIn();
  }

  onClick() {
    this.spotifyService.requestAuthorization();
  }
}
