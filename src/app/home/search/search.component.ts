import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  clientID: string;
  clientSecret: string;
  searchStr: string;
  token: any;
  tokenType: any;

  constructor(private spotifyService: SpotifyService) {

  }

  ngOnInit() {

  }

  searchArtists() {
    this.spotifyService.searchArtists(this.searchStr, this.token)
        .subscribe(res => {
          console.log(res);
        })
  }

  onClick() {
    console.log(this.clientID);
    this.spotifyService.getAuthorization(this.clientID, this.clientSecret).subscribe((data: any) => {
      this.token = data.access_token;
    });
  }

}
