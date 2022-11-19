import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'track',
  templateUrl: 'track.component.html',
})
export class TrackComponent implements OnInit {
    id: string;
    track: any;
    artist: any;
    recommendations: any;
    videoUrl: any;

    constructor (
        private spotifyService: SpotifyService,
        private youtubeService: YoutubeService,
        private route: ActivatedRoute,
        private router: Router,
        private domSanitizer: DomSanitizer,) {

    }

    ngOnInit() {
        this.route.params.pipe(
            map((params: any) => params['id']))
            .subscribe(id => {
                this.spotifyService.getTrack(id)
                    .subscribe(track => {
                        this.track = track;
                        this.spotifyService.getArtist(this.track.artists[0].id)
                            .subscribe(artist => {
                                this.artist = artist;
                                let genres = artist.genres[0];
                                this.spotifyService.getRecommendations(artist.id, genres, this.track.id)
                                    .subscribe(recommendations => {
                                        this.recommendations = recommendations.tracks;
                                    });
                            });
                        
                        this.youtubeService.searchYoutube(this.track.name+' '+this.track.artists[0].name+' lyrics')
                            .subscribe(videos => {
                                let url = 'https://www.youtube.com/embed/'+videos.items[0].id.videoId;
                                this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
                            });
                    });
            });
    }

    onAlbumSelect() {
        this.router.navigate(['album/'+this.track.album.id]);
    }

    onArtistSelect() {
        this.router.navigate(['artist/'+this.track.artists[0].id]);
    }

    onTrackSelect(recommendation: any) {
        this.router.navigate(['track/'+recommendation.id]);
    }

    convertDate(date: string) {
        var newDate = '';
        if (date.length == 10) {
            return newDate += date.substring(5,7)+'/'+date.substring(8,10)+'/'+date.substring(0,4);
        } else {
            return date;
        }
    }
}
