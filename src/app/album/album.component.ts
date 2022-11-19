import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
        private route: ActivatedRoute,
        private router: Router,) {

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

    onTrackSelect(track: any) {
        this.router.navigate(['track/'+track.id]);
    }

    convertDuration(duration: number) {
        let minutes = (duration/1000)/60;
        let remainder = ((duration/1000)%60).toString().split(".")[0];
        remainder = remainder.length == 1 ? '0'+remainder : remainder;

        return minutes.toString().split(".")[0]+':'+remainder.toString().split(".")[0];
    }
}
