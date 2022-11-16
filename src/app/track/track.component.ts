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

    constructor (
        private spotifyService: SpotifyService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getTrack(id)
                    .subscribe(track => {
                        this.track = track;
                    });
            });
    }
}
