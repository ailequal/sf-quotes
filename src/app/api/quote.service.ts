import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Quote} from "../models/quote";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  // TODO: Write the real service implementation with Firebase.

  constructor(private _http: HttpClient) {
  }

  // TODO: Get should retrieve the data starting from the most recent one.
  getQuotes(): Observable<Quote[]> {
    return this._http.get<Quote[]>(`${environment.apiUrl}/quotes`)
  }

  newQuote(quote: Omit<Quote, 'id'>): Observable<Quote> {
    // If we don't have an author set, we will always set "Anonymous".
    quote = quote.author ? quote : {...quote, author: "Anonymous"}

    return this._http.post<Quote>(`${environment.apiUrl}/quotes`, quote);
  }

  editQuote(quoteId: number, quote: Partial<Quote>): Observable<Quote> {
    return this._http.put<Quote>(`${environment.apiUrl}/quotes/${quoteId}`, quote);
  }

  deleteQuote(quoteId: number): Observable<any> {
    return this._http.delete<any>(`${environment.apiUrl}/quotes/${quoteId}`)
  }

}
