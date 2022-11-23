import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
    user: any;
    artists: any;
    tracks: any;
    
    constructor(
        private spotifyService: SpotifyService,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.spotifyService.getUser().subscribe(user => {
          this.user =  user;
        });
        this.spotifyService.getUserTopItems('artists').subscribe(artists => {
          this.artists = artists.items.slice(0, 6);
        });
        this.spotifyService.getUserTopItems('tracks').subscribe(tracks => {
          this.tracks = tracks.items;
        });
    }

    onArtistSelect(artist: any) {
      this.router.navigate(['artist/'+artist.id]);
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