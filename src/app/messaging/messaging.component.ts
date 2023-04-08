import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'messaging',
  templateUrl: 'messaging.component.html',
  styleUrls: ['messaging.component.css']
})
export class MessagingComponent implements OnInit {
    messagesData: any;
    message: any;

    readonly currentUser: any = localStorage.getItem("google_auth_uid");

    constructor(
        private dataService: DataService,
    ) {
    }

    ngOnInit(){
        this.dataService.getAllMessages().snapshotChanges().pipe(
            map(changes => 
                changes.map(c => 
                    ({id: c.payload.doc.id, ...c.payload.doc.data()})
                )
            )
        ).subscribe(data => {
            this.messagesData = data.filter((msg: any) => msg.toUid === this.currentUser || msg.fromUid === this.currentUser);
        });
    }

    saveMessage() {
        this.dataService.createMessage(this.message);
    }

    deleteMessage(id: string) {
        this.dataService.deleteMessage(id);
    }
}