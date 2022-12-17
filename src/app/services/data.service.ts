import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()
export class DataService {
    messagesRef: AngularFirestoreCollection<any>;

    constructor(
        private db: AngularFirestore,
    ) {
        this.messagesRef = this.db.collection('messages', ref => ref.orderBy('dateCreated'));
    }

    getAll(): AngularFirestoreCollection<any> {
        return this.messagesRef;
    }
    
    create(text: string): any {
        let message = {
            dateCreated: new Date(),
            photoURL: null,
            text: text,
            uid: localStorage.getItem("google_auth_uid")
        };
        return this.messagesRef.add({ ...message });
    }
    
    update(id: string, data: any): Promise<void> {
        return this.messagesRef.doc(id).update(data);
    }
    
    delete(id: string): Promise<void> {
        return this.messagesRef.doc(id).delete();
    }

}