import {Injectable} from '@angular/core';
import {Cookie} from "../models/cookie";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }

  public getCookie(name: string): string {
    if (!document.cookie.length)
      return '';

    const cookieArray: Array<string> = document.cookie.split(';');
    const nameEqual = `${name}=`;

    const find = cookieArray.find((cookie, index) => {
      return 0 === cookie.trim().indexOf(nameEqual);
    });

    if (!find)
      return '';

    return find.trim().substring(nameEqual.length, find.length);
  }

  public newCookie(cookie: Cookie, expireAfterMinutes: number = 60): boolean {
    const now = new Date();
    const later = new Date(now.getTime() + (expireAfterMinutes * 60000));

    if (!cookie.name.length)
      return false;

    document.cookie = `${cookie.name}=${cookie.value};expires=${later.toUTCString()}`;
    return true;
  }

  public deleteCookie(name: string): boolean {
    return this.newCookie({name: name, value: ''}, -1);
  }

}
