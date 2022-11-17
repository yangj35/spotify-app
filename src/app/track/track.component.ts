import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'track',
  templateUrl: 'track.component.html',
})
export class TrackComponent implements OnInit {
    id: string;
    track: any;
    artist: any;
    lyrics: any;

    constructor (
        private spotifyService: SpotifyService,
        private route: ActivatedRoute,) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getTrack(id)
                    .subscribe(track => {
                        this.track = track;
                        this.spotifyService.getArtist(this.track.artists[0].id)
                            .subscribe(artist => {
                                this.artist = artist;
                            });
                    });
            });
    }

    convertDate(date: string) {
        var newDate = '';
        if (date.length == 10) {
            return newDate += date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
        } else {
            return date;
        }
    }
}
