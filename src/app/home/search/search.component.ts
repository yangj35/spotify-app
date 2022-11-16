import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  artistSearchStr: string;
  trackSearchStr: string;
  artists: any;
  tracks: any;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router) {

  }

  ngOnInit() {

  }

  searchArtists() {
    if (this.artistSearchStr){
    this.spotifyService.searchItems(this.artistSearchStr, 'artist')
        .subscribe(results => {
          this.artists = results.artists.items;
          console.log(this.artists);
        })
    };
  }

  searchArtist = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      map(term => (term === '' || !this.artists) ? [] : this.artists.slice(0, 10)),
    );

  artistFormatter = (x: {name: string}) => x.name;

  onArtistSelect(event: any) {
    this.router.navigate(['artist/'+event.item.id]);
  }

  searchTracks() {
    if (this.trackSearchStr){
    this.spotifyService.searchItems(this.trackSearchStr, 'track')
        .subscribe(results => {
          this.tracks = results.tracks.items;
          console.log(this.tracks);
        })
    };
  }

  searchTrack = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      map(term => (term === '' || !this.tracks) ? [] : this.tracks.slice(0, 10)),
    );

  trackFormatter = (x: {name: string}) => x.name;

  onTrackSelect(event: any) {
    this.router.navigate(['track/'+event.item.id]);
  }
}
