import { Injectable } from '@angular/core';
import { Client, query, PageHelper, values } from 'faunadb';

interface FaunaResponse {
  after?: [];
  data?: [];
}
const AUTH_PROP_KEY = 'https://faunad.com/id/secret';

@Injectable({
  providedIn: 'root'
})


export class FaunadbService {

  constructor() { }

  getUserClient(currentUser): Client {
    return new Client({ secret: currentUser[AUTH_PROP_KEY] });
  }

  async getRandomMindfulFromFauna(userObj) {
    const client = await this.getUserClient(userObj);
    const q = query;
    try {
      const mindfulThings: FaunaResponse = await client.query(
        q.Paginate(
          q.Documents(q.Collection('mindful_things'))
        )
      );
      const randomMindful: FaunaResponse = mindfulThings.data[Math.floor(Math.random() * mindfulThings.data.length)];
      const creation: FaunaResponse = await client.query(q.Call('addUserMindful', randomMindful));

      return creation.data;

    } catch (error) {
      console.log(error);
    }
  }

}

