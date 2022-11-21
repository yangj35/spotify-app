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

                this.spotifyService.getArtistAlbums(id)
                    .subscribe(albums => {
                        let results: any[] = [];
                        for (let album of albums.items) {
                            if (!results.find(res => {return res.name === album.name})) {
                                results.push(album);
                            }
                        }
                        this.albums = results;
                    });
            });
    }
}
