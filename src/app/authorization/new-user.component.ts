import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'new-user',
  templateUrl: 'new-user.component.html',
})
export class NewUserComponent implements OnInit {
    firstName: string;
    lastName: string;

    constructor(
      private authService: AuthService,
      private router: Router,
      private dataService: DataService,
      ) {
    }

    ngOnInit() {
    }

    createUser() {
      this.dataService.createUser(this.firstName, this.lastName);
      this.dataService.createFriend(localStorage.getItem("google_auth_uid"));
      this.router.navigate(['']);
    }

    cancel() {
      this.authService.logout();
      this.router.navigate(['']);
    }
}
