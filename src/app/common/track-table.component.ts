import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'track-table',
  templateUrl: 'track-table.component.html',
})
export class TrackTableComponent implements OnInit {
    @Input() tracks: any;

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        
    }

    onTrackSelect(track: any) {
        this.router.navigate(['track/'+track.id]);
    }

    convertDuration(duration: number) {
    let minutes = (duration/1000)/60;
    let remainder = ((duration/1000)%60).toString().split(".")[0];
    remainder = remainder.length == 1 ? '0'+remainder : remainder;

    return minutes.toString().split(".")[0]+':'+remainder.toString().split(".")[0];
  }
}