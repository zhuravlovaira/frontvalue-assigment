import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from './joke.interface';

@Injectable({ providedIn: 'root' })
export class JokesDataService {
  private readonly url = 'https://api.chucknorris.io/jokes/random';

  constructor(private readonly http: HttpClient) {}

  getJokes$(): Observable<Joke> {
    return this.http.request<Joke>('GET', this.url);
  }
}
