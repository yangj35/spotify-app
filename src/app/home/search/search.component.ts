import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  searchStr: string;
  artists: any;

  constructor(private spotifyService: SpotifyService) {

  }

  ngOnInit() {

  }

  searchArtists() {
    if (this.searchStr){
    this.spotifyService.searchArtists(this.searchStr)
        .subscribe(results => {
          this.artists = results.artists.items;
        })
    };
  }
}
