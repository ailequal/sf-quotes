import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Quote, SuggestedQuote} from "../models/quote";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  // TODO: Write the real service implementation with Firebase.

  suggestedQuotesApiUrl: string = 'https://type.fit/api/quotes';

  constructor(private _http: HttpClient) {
  }

  getQuotes(): Observable<Quote[]> {
    return this._http.get<Quote[]>(`${environment.apiUrl}/quotes`, {
      params: {
        _sort: 'id',
        _order: 'desc'
      }
    })
  }

  newQuote(quote: Omit<Quote, 'id'>): Observable<Quote> {
    // TODO: Can we do this control inside the quote-form component??
    //  We could use a custom pipe, but that's not really "right".
    //  The real solution would be to make the form and modal two things separately.

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

  getSuggestedQuotes(limit: number = 10): Observable<Omit<Quote, 'id'>[]> {
    return this._http.get<SuggestedQuote[]>(this.suggestedQuotesApiUrl).pipe(
      map(quotes => {
        if (0 === limit)
          return quotes;

        // @link https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array
        const shuffled = [...quotes].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, limit);
      }),
      map(quotes => {
        return quotes.map(quote => {
          return {content: quote.text, author: quote.author}
        })
      })
    )
  }

  getSuggestedQuote(): Observable<Omit<Quote, 'id'>> {
    return this.getSuggestedQuotes().pipe(
      map(suggestedQuotes => {
        if (!suggestedQuotes.length) {
          return {
            content: 'When life gives you lemons, make lemonade.',
            author: 'Anonymous'
          }
        }

        return suggestedQuotes[Math.floor(Math.random() * suggestedQuotes.length)];
      })
    )
  }

}
