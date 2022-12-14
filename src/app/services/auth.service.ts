import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'

@Injectable()
export class AuthService {

    constructor(
        private fireauth: AngularFireAuth,
    ) {

    }

    login() {
        return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
            if (res?.user) {
                localStorage.setItem("google_auth_uid", res.user.uid);
                location.reload();
            }
        });
    }

    isLoggedIn() {
        return localStorage.getItem("google_auth_uid") ? true : false;
    }

    logout() {
        return this.fireauth.signOut().then((res) => {
            localStorage.removeItem("google_auth_uid");
            location.reload();
        });
    }
}