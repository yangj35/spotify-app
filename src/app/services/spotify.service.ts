import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

@Injectable()
export class SpotifyService {
    private searchUrl: string;
    
    private clientId: string;
    private clientSecret: string;

    constructor(private http: HttpClient) {

    }

    getAuthorization(clientID: string, clientSecret: string){
        this.clientId = clientID;
        this.clientSecret = clientSecret;
        const authorizationTokenUrl = 'https://accounts.spotify.com/api/token';
        var body = 'grant_type=client_credentials';
        return this.http.post(authorizationTokenUrl, body, {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
        });
    }

    searchArtists(str: string, token: any): Observable<any> {
        this.searchUrl = 'https://api.spotify.com/v1/search?q='+str+'&type=artist';
        return this.http.get<any>(this.searchUrl, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
            })
        });
    }
}