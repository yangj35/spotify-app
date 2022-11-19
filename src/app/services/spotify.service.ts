import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Injectable()
export class SpotifyService {
    private clientID: any;
    private clientSecret: any;
    private accessToken: any;
    private refreshToken: any;
    private tokenExpiryTime: any;

    private redirectUri = 'http://localhost:4200/'

    constructor(
        private http: HttpClient,
        private router: Router) {

    }

    onPageLoad() {
        this.clientID = localStorage.getItem("client_id");
        this.clientSecret = localStorage.getItem("client_secret");
        if (window.location.search.length > 0) {
            this.handleRedirect();
        }
        else {
            this.accessToken = localStorage.getItem("access_token");

            if (!this.accessToken) {
                // we don't have an access token so present token section
                this.router.navigate(['authorization']);
            }
            else {
                // we have an access token so present search section so do nothing
            }
        }
    }

    requestAuthorization(clientID: string, clientSecret: string) {
        localStorage.setItem("client_id", clientID);
        localStorage.setItem("client_secret", clientSecret);
        const url = 'https://accounts.spotify.com/authorize?'+'client_id='+clientID+
            '&response_type=code&redirect_uri='+this.redirectUri+'&show_dialog=true';
        window.location.href = url;
    }

    handleRedirect() {
        let code = this.getCode();
        this.fetchAccessToken(code);
        window.history.pushState("", "", this.redirectUri);
    }

    getCode() {
        let code: any;
        const queryString = window.location.search;
        if ( queryString.length > 0 ){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code')
        }
        return code;
    }

    fetchAccessToken(code: any) {
        let body = 'grant_type=authorization_code'+'&code='+code+'&redirect_uri='+this.redirectUri
            +'&client_id='+this.clientID+'&client_secret='+this.clientSecret;
        this.callAuthorizationAPI(body);
    }

    refreshAccessToken(){
        this.refreshToken = localStorage.getItem("refresh_token");
        this.clientID = localStorage.getItem("client_id")
        let body = 'grant_type=refresh_token&refresh_token='+this.refreshToken+'&client_id='+this.clientID;
        this.callAuthorizationAPI(body);
    }

    callAuthorizationAPI(body: string) {
        const authorizationTokenUrl = 'https://accounts.spotify.com/api/token';
        return this.http.post(authorizationTokenUrl, body, {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + Buffer.from(this.clientID + ':' + this.clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
        }).subscribe(response => this.handleAuthorizationResponse(response));
    }

    handleAuthorizationResponse(response: any) {
        if (response.access_token || response.refresh_token){
            const d = new Date();
            this.tokenExpiryTime = d.getTime() + (response.expires_in * 1000);
            localStorage.setItem("tokenExpiryTime", this.tokenExpiryTime);
            if (response.access_token){
                this.accessToken = response.access_token;
                localStorage.setItem("access_token", this.accessToken);
            }
            if (response.refresh_token){
                this.refreshToken = response.refresh_token;
                localStorage.setItem("refresh_token", this.refreshToken);
            }
            this.onPageLoad();
        }
        else {
            alert('Authorization request failed!');
        }
    }

    callGetAPI(url: string): Observable<any> {
        const d = new Date();
        this.tokenExpiryTime = localStorage.getItem("tokenExpiryTime");
        if (this.tokenExpiryTime <= d.getTime()) {
            this.refreshAccessToken();
        }
        return this.http.get<any>(url, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.accessToken,
            })
        });
    }

    searchItems(str: string, type: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/search?q='+str+'&type='+type);
    }

    getArtist(id: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/artists/'+id);
    }

    getArtistAlbums(artistId: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/artists/'+artistId+'/albums');
    }

    getAlbum(id: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/albums/'+id);
    }

    getTrack(id: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/tracks/'+id);
    }

    getRecommendations(artistIds: string, genresIds: string, trackIds: string) {
        return this.callGetAPI('https://api.spotify.com/v1/recommendations?seed_artists='+artistIds+'&seed_genres='+genresIds+'&seed_tracks='+trackIds);
    }
}