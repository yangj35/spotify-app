import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
    user: any;
    
    constructor(
        private spotifyService: SpotifyService,
    ) {

    }

    ngOnInit() {
        this.spotifyService.getUser().subscribe(user => {
          this.user =  user;
        });
    }
}