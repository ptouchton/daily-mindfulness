import { Injectable } from '@angular/core';
import { Client } from 'faunadb';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

const AUTH_PROP_KEY = 'https://faunad.com/id/secret';

export class FaunadbService {

  constructor() { }

  getUserClient(currentUser): Observable<any> {
    return from(new Client({ secret: currentUser[AUTH_PROP_KEY]}));
  }
}
