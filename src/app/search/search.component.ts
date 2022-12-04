import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { SpotifyService } from 'src/app/services/spotify.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  artistSearchStr: string;
  trackSearchStr: string;
  playlistSearchStr: string;
  artists: any;
  tracks: any;
  playlists: any;

  constructor(
    private spotifyService: SpotifyService,
    private youtubeService: YoutubeService,
    private router: Router) {

  }

  ngOnInit() {
  }

  searchArtists() {
    if (this.artistSearchStr) {
      this.spotifyService.searchItems(this.artistSearchStr, 'artist')
          .subscribe(results => {
            this.artists = results.artists.items;
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
    if (this.trackSearchStr) {
      this.spotifyService.searchItems(this.trackSearchStr, 'track')
          .subscribe(results => {
            this.tracks = results.tracks.items;
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

  searchPlaylists() {
    if (this.playlistSearchStr) {
      this.spotifyService.searchItems(this.playlistSearchStr, 'playlist')
          .subscribe(results => {
            this.playlists = results.playlists.items;
          })
    };
  }

  searchPlaylist = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      map(term => (term === '' || !this.playlists) ? [] : this.playlists.slice(0, 10)),
    );

  playlistFormatter = (x: {name: string}) => x.name;

  onPlaylistSelect(event: any) {
    this.router.navigate(['playlist/'+event.item.id]);
  }
}
