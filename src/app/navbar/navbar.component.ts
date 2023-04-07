import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isLoggedIntoSpotify: boolean;
  spotifyLogoutClicked: boolean;

  user: any;

  constructor(
    private authService: AuthService,
    private spotifyService: SpotifyService,
    private router: Router,
    private dataService: DataService,
    ) {

    }

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isLoggedIntoSpotify = this.spotifyService.isLoggedIn();

      this.dataService.getAllUsers().snapshotChanges().pipe(
        map(changes => 
            changes.map(c => 
                ({id: c.payload.doc.id, ...c.payload.doc.data()})
            )
        )
      ).subscribe(data => {
          this.user = data.find(user => user.uid === localStorage.getItem("google_auth_uid"));
      });
    }

    async login() {
      await this.authService.login();
      if (!this.user){
        this.router.navigate(['new-user']);
      }
      console.log(this.user);
    }

    logout() {
      this.authService.logout();
    }

    spotifyLogout() {
      this.spotifyService.logout();
      this.isLoggedIntoSpotify = false;
      this.spotifyLogoutClicked = true;
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    spotifyLogin() {
      this.spotifyService.requestAuthorization();
    }

    reloadPage() {
      window.location.reload();
    }
}
