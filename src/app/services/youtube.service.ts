import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Injectable()
export class YoutubeService {
    private apiKey: any;

    constructor(
        private http: HttpClient,
        private router: Router) {

    }

    requestAuthorization (apiKey: string) {
        localStorage.setItem("api_key", apiKey);
    }

    searchYoutube (str: string): Observable<any> {
        this.apiKey = localStorage.getItem("api_key");
        return this.http.get('https://www.googleapis.com/youtube/v3/search?q='
            +str+'&type=video'+'&key='+this.apiKey);
    }
}