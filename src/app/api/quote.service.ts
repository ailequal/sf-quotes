import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private _http: HttpClient) {
  }

  // TODO: Write the real service implementation.
  getQuotes(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/#`)
  }

}
