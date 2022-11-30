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
      this.spotifyService.getCurrentUser().subscribe(user => {
        this.user =  user;
      });
      this.spotifyService.getCurrentUserTopItems('artists').subscribe(artists => {
        this.artists = artists.items.slice(0, 6);
      });
      this.spotifyService.getCurrentUserTopItems('tracks').subscribe(tracks => {
        this.tracks = tracks.items;
      });
  }

  onArtistSelect(artist: any) {
    this.router.navigate(['artist/'+artist.id]);
  }
}