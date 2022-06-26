import DocumentReference = firebase.firestore.DocumentReference;
import firebase from "firebase/compat/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Quote, SuggestedQuote} from "../models/quote";
import {map, Observable, of, switchMap, take, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  suggestedQuotesApiUrl: string = 'https://type.fit/api/quotes';

  lemonQuote: SuggestedQuote = {
    uid: '0000000000000000000000000000',
    content: 'When life gives you lemons, make lemonade.',
    author: 'Anonymous'
  }

  constructor(
    private _http: HttpClient,
    private _fireStore: AngularFirestore,
    private _authService: AuthService
  ) {
  }

  getQuotes(): Observable<Quote[]> {
    return this._authService.user$.pipe(
      switchMap(user => {
        if ('0000000000000000000000000000' === user.uid)
          return of([]);

        return (
          this._fireStore.collection<Quote>('quotes', query => {
            return query.where('userUid', '==', user.uid).orderBy('timestamp', 'desc');
          }).valueChanges({idField: 'uid'})
        )
      })
    );
  }

  newQuote(quote: Omit<Quote, 'uid' | 'userUid' | 'timestamp'>): Observable<DocumentReference<Omit<Quote, 'uid'>> | never> {
    return this._authService.user$.pipe(
      take(1), // In this way it will always complete after a single execution.
      switchMap(user => {
        if ('0000000000000000000000000000' === user.uid) {
          return throwError(() => {
            return new Error('The user is not logged in.');
          });
        }

        return (
          // The promise will be automatically converted into an observable.
          this._fireStore.collection<Omit<Quote, 'uid'>>('quotes').add({
            userUid: user.uid,
            ...quote,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
          })
        );
      })
    );
  }

  editQuote(quoteUid: string, quote: Partial<Quote>): Observable<void | never> {
    return this._authService.user$.pipe(
      take(1), // In this way it will always complete after a single execution.
      switchMap(user => {
        if ('0000000000000000000000000000' === user.uid) {
          return throwError(() => {
            return new Error('The user is not logged in.');
          });
        }

        return (
          // The promise will be automatically converted into an observable.
          this._fireStore.collection<Quote>('quotes', query => {
            return query.where('userUid', '==', user.uid);
          }).doc(quoteUid).update({
            ...quote,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
          })
        );
      })
    );
  }

  deleteQuote(quoteUid: string): Observable<void | never> {
    return this._authService.user$.pipe(
      take(1), // In this way it will always complete after a single execution.
      switchMap(user => {
        if ('0000000000000000000000000000' === user.uid) {
          return throwError(() => {
            return new Error('The user is not logged in.');
          });
        }

        return (
          // The promise will be automatically converted into an observable.
          this._fireStore.collection<Quote>('quotes', query => {
            return query.where('userUid', '==', user.uid);
          }).doc(quoteUid).delete()
        );
      })
    );
  }

  /**
   * Import the suggested quotes from the relative api into our backend.
   * The data structure will be converted to our needs.
   * Check the backend rules before executing this command.
   * Remember that Firebase only allows a maximum of 500 writes per request.
   *
   * @param limit
   *
   * @return void
   */
  importSuggestedQuotes(limit: number = 10): void {
    // You should only execute this function once overall.
    // This return is a safety measure (disable it before executing the method).
    // return;

    this._http.get<{ text: string, author: string }[]>(this.suggestedQuotesApiUrl).pipe(
      map(quotes => {
        if (-1 === limit)
          return quotes;

        // Get only the limited requested amount starting from the array.
        // @link https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array
        const shuffled = [...quotes].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, limit);
      }),
      map(quotes => {
        return quotes.map(quote => {
          // Since the api has the data formatted differently, we map each value correctly.
          return {content: quote.text, author: quote.author ? quote.author : 'Anonymous'}
        })
      })
    ).subscribe(quotes => {
      const db = firebase.firestore();
      const batch = db.batch();

      quotes.forEach(quote => {
        const ref = db.collection('suggestedQuotes').doc();
        batch.set(ref, quote);
      })

      batch.commit().then(console.log);
    });
  }

  getSuggestedQuotes(limit: number = 10): Observable<SuggestedQuote[]> {
    return this._fireStore.collection<SuggestedQuote>('suggestedQuotes', query => {
      // TODO: It would be nice to implement the randomness here during the query execution.
      //  @link https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
      return (-1 === limit) ? query : query.limit(limit);
    }).valueChanges({idField: 'uid'}).pipe(take(1)); // In this way it will always complete after a single execution.
  }

  getSuggestedQuote(): Observable<SuggestedQuote> {
    // TODO: Not optimal, since we are executing the same request every time,
    //  when we could instead add randomness into the "getSuggestedQuotes()" method.
    return this.getSuggestedQuotes(-1).pipe(
      map(suggestedQuotes => {
        if (!suggestedQuotes.length)
          return this.lemonQuote;

        // Get a single random quote.
        return suggestedQuotes[Math.floor(Math.random() * suggestedQuotes.length)];
      })
    );
  }

}
