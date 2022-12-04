import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { variables } from 'src/environments/variables';
@Injectable()
export class SpotifyService {
    private clientID: any;
    private clientSecret: any;
    private accessToken: any;
    private refreshToken: any;
    private tokenExpiryTime: any;

    isFirstLoadAfterLogin: boolean;

    private redirectUri = 'http://localhost:4200'

    constructor(
        private http: HttpClient,
        private router: Router) {

    }

    isLoggedIn() {
        return localStorage.getItem("access_token") ? true : false;
    }

    logout() {
        localStorage.removeItem("client_id");
        localStorage.removeItem("client_secret");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("tokenExpiryTime");
    }

    onPageLoad() {
        console.log(variables.GOOGLE_API_KEY);
        this.clientID = localStorage.getItem("client_id");
        this.clientSecret = localStorage.getItem("client_secret");
        this.accessToken = localStorage.getItem("access_token");
        if (window.location.search.length > 0) {
            this.handleRedirect();
        }
        else if (this.isFirstLoadAfterLogin) {
            this.router.navigate(['']);
            this.isFirstLoadAfterLogin = false;
        }
        else if (!this.accessToken) {
            this.router.navigate(['']);
        }
    }

    requestAuthorization(clientID: string, clientSecret: string) {
        localStorage.setItem("client_id", clientID);
        localStorage.setItem("client_secret", clientSecret);
        let scope = 'user-read-email user-read-private user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative';
        const url = 'https://accounts.spotify.com/authorize?'+'client_id='+clientID+
            '&response_type=code&scope='+scope+'&redirect_uri='+this.redirectUri+'&show_dialog=true';
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
            this.isFirstLoadAfterLogin = true;
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

    getRecommendations(artistIds: string, genresIds: string, trackIds: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/recommendations?seed_artists='+artistIds+'&seed_genres='+genresIds+'&seed_tracks='+trackIds);
    }

    getCurrentUser(): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/me');
    }

    getCurrentUserTopItems(type: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/me/top/'+type);
    }

    getCurrentUserPlaylists(): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/me/playlists');
    }

    getPlaylist(id: string): Observable<any> {
        return this.callGetAPI('https://api.spotify.com/v1/playlists/'+id);
    }

}