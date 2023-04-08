import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'messaging-home',
  templateUrl: 'messaging-home.component.html',
})
export class MessagingHomeComponent implements OnInit {
  friends: any;

  constructor(
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.dataService.getAllFriends().snapshotChanges().pipe(
      map(changes => 
          changes.map(c => 
              ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
      )
    ).subscribe(friends => {
      this.friends = friends.filter((friend: any) => friend.userOne === localStorage.getItem("google_auth_uid") || friend.userTwo === localStorage.getItem("google_auth_uid"));
    });
  }
}