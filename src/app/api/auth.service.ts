import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Injectable} from '@angular/core';
import {delay, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {Guest, User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | Guest> | null = null;

  guest: Guest = {
    uid: '0000000000000000000000000000',
    displayName: 'Guest',
    photoURL: 'https://via.placeholder.com/96/49566B/FFFFFF?text=Guest'
  };

  /**
   * The constructor function.
   *
   * @param _router
   * @param _fireAuth
   * @param _fireStore
   */
  constructor(
    private _router: Router,
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore
  ) {
    // Remap the default Firebase user object with our custom data attached.
    this.user$ = this._fireAuth.authState.pipe(
      delay(300),
      switchMap(user => {
        if (!user)
          return of(this.guest);

        return this._fireStore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
          map(user => {
            return user ? user : this.guest;
          })
        );
      })
    );
  }

  /**
   * Handle the login through email.
   */
  async emailLogin(): Promise<void> {
    // TODO: Implement the standard login with the email.
    return new Promise<void>(() => {
    })

    // return await this.editUser(credential.user); // The result will always be undefined.
  }

  /**
   * Handle the login through Google.
   */
  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this._fireAuth.signInWithPopup(provider);

    return await this.editUser(credential.user); // The result will always be undefined.
  }

  /**
   * Add or update the logged-in user into the users' collection.
   *
   * @param user
   * @private
   */
  private editUser(user: firebase.User | null): Promise<void> {
    if (!user) {
      return new Promise<void>(() => {
      })
    }

    // Create the local relative user document reference.
    const userDocument: AngularFirestoreDocument<User> = this._fireStore.doc(`users/${user.uid}`);

    // Gather all the user data.
    const data: User = {
      uid: user.uid,
      email: user.email ? user.email : '',
      displayName: user.displayName ? user.displayName : '',
      photoURL: user.photoURL ? user.photoURL : '',
      data: {
        lastLogin: Date.now()
      }
    }

    // Set the user data and return the result (promise with void).
    return userDocument.set(data, {merge: true})
  }

  /**
   * Handle the logout.
   */
  async logout(): Promise<boolean> {
    await this._fireAuth.signOut();

    // TODO: Decide how to handle the routing for the auth.
    return await this._router.navigateByUrl('/');
  }

}
