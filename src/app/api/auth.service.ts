import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Guest, User} from "../models/user";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, delay, map, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: Implement OAuth 2.0!!

  user$!: Observable<User | Guest>;

  isGuest$!: Observable<boolean>;

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
      }),
      catchError(error => {
        console.log(error);
        return this.user$; // TODO: Seems like it's working, but it could trigger an infinite loop maybe??
      })
    );

    // Set the isGuest$ observable for quickly detecting the user status.
    this.isGuest$ = this.user$.pipe(
      map(user => {
        // The guest will always have this "fake" uid.
        return '0000000000000000000000000000' === user.uid;
      })
    );
  }

  /**
   * Handle the login through email.
   */
  async emailLogin(): Promise<void> {
    // TODO: Implement the standard login with the email (we'll also need to create a register module/component).
    return new Promise<void>(() => {
    })
  }

  /**
   * Handle the login through Google.
   */
  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this._fireAuth.signInWithPopup(provider);

    // Redirect and only later finish updating the user data (prevents ui bug).
    await this._router.navigateByUrl('/');

    return await this.editUser(credential.user);
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

    return await this._router.navigateByUrl('/login');
  }

}
