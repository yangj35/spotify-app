import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Artist } from '../interfaces/artist';

@Injectable()
export class SpotifyService {
    private searchUrl: string;

    constructor(private http: HttpClient) {

    }

    searchArtists(str: string): Observable<Artist[]> {
        this.searchUrl = 'https://api.spotify.com/v1/search?q='+str+'&type=artist';
        return this.http.get<Artist[]>(this.searchUrl)
            .pipe(
                tap(_ => console.log('fetched artist id=${id}'))
            );
    }
}