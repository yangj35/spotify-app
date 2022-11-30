import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.component.html',
})

export class PlaylistComponent implements OnInit {
    playlist: any;
    tracks: any;

    constructor(
        private spotifyService: SpotifyService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getPlaylist(id)
                    .subscribe(playlist => {
                        this.playlist = playlist;
                        this.tracks = playlist.tracks.items.map((tracks: any) => tracks.track);
                    });
            });
    }
}