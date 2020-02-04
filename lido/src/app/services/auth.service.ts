import { auth } from 'firebase/app';

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified) {
          this.setUserData(result.user);
          this.ngZone.run(() => {
            this.router.navigate(['submit']);
          });
        } else {
          window.alert('You still need to verify your email address.');
        }
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  signUp(email, password, displayName) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({ displayName });
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch(error => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['submit']);
        });
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
      localStorage.removeItem('user');
    });
  }
}
