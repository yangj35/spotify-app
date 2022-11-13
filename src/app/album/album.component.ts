import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'album',
  templateUrl: 'album.component.html',
})
export class AlbumComponent implements OnInit {
    id: string;
    album: any;

    constructor(
        private spotifyService: SpotifyService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getAlbum(id)
                    .subscribe(album => {
                        this.album = album;
                    });
            });
    }
}
