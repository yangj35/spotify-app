import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable()
export class DataService {
    currentUserUid = localStorage.getItem("google_auth_uid");

    messagesRef: AngularFirestoreCollection<any>;
    usersRef: AngularFirestoreCollection<any>;
    friendsRef: AngularFirestoreCollection<any>;

    constructor(
        private db: AngularFirestore,
        private fireauth: AngularFireAuth,
    ) {
        this.messagesRef = this.db.collection('messages', ref => ref.orderBy('dateCreated'));
        this.usersRef = this.db.collection('users');
        this.friendsRef = this.db.collection('friends');
    }

    getAllMessages(): AngularFirestoreCollection<any> {
        return this.messagesRef;
    }
    
    createMessage(text: string): any {
        let message = {
            dateCreated: new Date(),
            text: text,
            fromUid: this.currentUserUid,
            toUid: this.currentUserUid
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
            firstName: firstName ?? null,
            lastName: lastName ?? null,
            photoURL: null,
            uid: this.currentUserUid
        };
        return this.usersRef.add({ ...user });
    }

    getAllFriends() {
        return this.friendsRef;
    }

    createFriend(friendUid: any) {
        let friend = {
            userOne: this.currentUserUid,
            userTwo: friendUid,
            isMessaging: friendUid === this.currentUserUid
        };
        return this.friendsRef.add({ ...friend });
    }
}