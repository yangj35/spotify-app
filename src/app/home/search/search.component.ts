import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
})
export class SearchComponent {
  searchStr: string;

  constructor(private spotifyService: SpotifyService) {

  }

  searchMusic() {
    this.spotifyService.searchArtists(this.searchStr)
        .subscribe(res => {
          console.log(res);
        })
  }

}
