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
  searchStr: string;
  artists: any;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router) {

  }

  ngOnInit() {

  }

  searchArtists() {
    if (this.searchStr){
    this.spotifyService.searchArtists(this.searchStr)
        .subscribe(results => {
          this.artists = results.artists.items;
          console.log(this.artists);
        })
    };
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      map(term => (term === '') ? [] : this.artists.slice(0, 10)),
    );

  formatter = (x: {name: string}) => x.name;

  onSelect(event: any) {
    this.router.navigate(['artist/'+event.item.id]);
  }
}
