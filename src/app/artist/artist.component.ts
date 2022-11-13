import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
})
export class ArtistComponent implements OnInit {
    id: string;
    artist: any;
    albums: any;

    constructor (
        private spotifyService: SpotifyService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getArtist(id)
                    .subscribe(artist => {
                        this.artist = artist;
                    });

                this.spotifyService.getAlbums(id)
                    .subscribe(albums => {
                        this.albums = albums.items;
                    });
            });
    }
}
