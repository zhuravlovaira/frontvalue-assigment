import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Joke } from 'src/libs/data/jokes/joke.interface';

const MAX_FAVORITE_JOKES = 10;

@Injectable({ providedIn: 'root' })
export class FavoriteJokesService {
  readonly favoriteJokes$ = new BehaviorSubject<Joke[]>([]);
  private readonly key = 'favoriteJokes';

  constructor(private messageService: MessageService) {
    this.favoriteJokes$.next(this.getFavoriteJokesFromLocalStorage());
  }

  addFavoriteJoke$(joke: Joke): Observable<boolean> {
    return this.favoriteJokes$.pipe(
      take(1),
      map((jokes: Joke[]) => {
        if (jokes.length >= MAX_FAVORITE_JOKES) {
          this.messageService.add({
            severity: 'info',
            summary: 'Too many jokes',
            detail: `You can add only ${MAX_FAVORITE_JOKES} jokes to favorite`,
          });
          return false;
        } else {
          jokes.push(joke);
          localStorage.setItem(this.key, JSON.stringify(jokes));
          this.favoriteJokes$.next(jokes);
          return true;
        }
      })
    );
  }

  removeFavoriteJoke(jokeToRemove: Joke): void {
    this.favoriteJokes$.pipe(take(1)).subscribe((jokes: Joke[]) => {
      const updatedFavoriteJokes = jokes.filter(
        (joke: Joke) => joke.id !== jokeToRemove.id
      );
      localStorage.setItem(this.key, JSON.stringify(updatedFavoriteJokes));
      this.favoriteJokes$.next(updatedFavoriteJokes);
    });
  }

  getFavoriteJokes$(): Observable<Joke[]> {
    return this.favoriteJokes$.asObservable();
  }

  private getFavoriteJokesFromLocalStorage(): Joke[] {
    const favoriteJokesString = localStorage.getItem(this.key)
      ? localStorage.getItem(this.key)
      : '';
    return favoriteJokesString ? JSON.parse(favoriteJokesString) : [];
  }
}
