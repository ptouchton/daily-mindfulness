import { Injectable } from '@angular/core';
import { Client } from 'faunadb';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

const AUTH_PROP_KEY = 'https://faunad.com/id/secret';

export class FaunadbService {

  constructor() { }

  getUserClient(currentUser): Observable<any> {
    return of(new Client({ secret: currentUser[AUTH_PROP_KEY]}));
  }

 getRandomMindfulFromFauna(userObj) {
    const client = await this.getUserClient(userObj);

    try {
        const mindfulThings = await client.query(
            q.Paginate(
                q.Documents(q.Collection('mindful_things'))
            )
        );
        const randomMindful = mindfulThings.data[Math.floor(Math.random() * mindfulThings.data.length)];
        const creation = await client.query(q.Call('addUserMindful', randomMindful));

        return creation.data.mindful;

    } catch (error) {
        console.log(error);
    }
}

}

