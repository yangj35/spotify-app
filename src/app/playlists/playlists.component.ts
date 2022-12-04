import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'playlists',
  templateUrl: 'playlists.component.html',
})
export class PlaylistsComponent implements OnInit {
    playlists: any;

    constructor(
        private spotifyService: SpotifyService,
    ) {

    }

    ngOnInit() {
        if (this.spotifyService.isLoggedIn()){
            this.spotifyService.getCurrentUserPlaylists()
                        .subscribe(playlists => {
                            this.playlists = playlists.items;
                        });
        }
    }

}