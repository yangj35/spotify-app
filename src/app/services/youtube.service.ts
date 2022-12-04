import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { variables } from 'src/environments/variables';

@Injectable()
export class YoutubeService {
    private apiKey = variables.GOOGLE_API_KEY;

    constructor(
        private http: HttpClient,
        private router: Router) {

    }

    isLoggedIn() {
        return this.apiKey ? true: false;
    }

    logout() {
    }

    searchYoutube (str: string): Observable<any> {
        return this.http.get('https://www.googleapis.com/youtube/v3/search?q='
            +str+'&type=video'+'&key='+this.apiKey);
    }
}