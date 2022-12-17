import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'messaging',
  templateUrl: 'messaging.component.html',
})
export class MessagingComponent implements OnInit {
    messagesData: any;
    message: any;

    constructor(
        private dataService: DataService,
    ) {
    }

    ngOnInit(){
        this.dataService.getAll().snapshotChanges().pipe(
            map(changes => 
                changes.map(c => 
                    ({id: c.payload.doc.id, ...c.payload.doc.data()})
                )
            )
        ).subscribe(data => {
            this.messagesData = data;
            console.log(this.messagesData);
        });
    }

    saveMessage() {
        this.dataService.create(this.message);
    }

    deleteMessage(id: string) {
        this.dataService.delete(id);
    }
}