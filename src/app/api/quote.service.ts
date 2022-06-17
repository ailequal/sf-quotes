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

  getQuotes(): Observable<Quote[]> {
    return this._http.get<Quote[]>(`${environment.apiUrl}/quotes`)
  }

  deleteQuote(quoteId: number): Observable<any> {
    return this._http.delete<any>(`${environment.apiUrl}/quotes/${quoteId}`)
  }

}
