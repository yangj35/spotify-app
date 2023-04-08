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

  currentUserFirstName: string;

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

      // Create user for new users
      if (this.isLoggedIn) {
        this.dataService.getAllUsers().snapshotChanges().pipe(
          map(changes => 
              changes.map(c => 
                  ({id: c.payload.doc.id, ...c.payload.doc.data()})
              )
          )
        ).subscribe(users => {
          let currentUser = users.find(user => user.uid === localStorage.getItem("google_auth_uid"));
          if (!currentUser) {
            this.router.navigate(['new-user']);
          } else {
            this.currentUserFirstName = currentUser.firstName;
          }
        });
      }
    }

    login() {
      this.authService.login();
    }

    async logout() {
      await this.authService.logout();
      this.router.navigate(['']);
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
