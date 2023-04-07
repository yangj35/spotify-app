import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { collection, query, where } from "firebase/firestore";

@Injectable()
export class DataService {
    messagesRef: AngularFirestoreCollection<any>;
    usersRef: AngularFirestoreCollection<any>;

    constructor(
        private db: AngularFirestore,
        private fireauth: AngularFireAuth,
    ) {
        this.messagesRef = this.db.collection('messages', ref => ref.orderBy('dateCreated'));
        this.usersRef = this.db.collection('users');
    }

    getAllMessages(): AngularFirestoreCollection<any> {
        return this.messagesRef;
    }
    
    createMessage(text: string): any {
        let message = {
            dateCreated: new Date(),
            text: text,
            fromUid: localStorage.getItem("google_auth_uid"),
            toUid: localStorage.getItem("google_auth_uid")
        };
        return this.messagesRef.add({ ...message });
    }
    
    updateMessage(id: string, data: any): Promise<void> {
        return this.messagesRef.doc(id).update(data);
    }
    
    deleteMessage(id: string): Promise<void> {
        return this.messagesRef.doc(id).delete();
    }

    getAllUsers() {
        return this.usersRef;
    }

    async createUser(firstName: string, lastName: string) {
        let email = await this.fireauth.currentUser.then(user => user?.email);
        let user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            photoURL: null,
            uid: localStorage.getItem("google_auth_uid")
        };
        return this.usersRef.add({ ...user });
    }

}