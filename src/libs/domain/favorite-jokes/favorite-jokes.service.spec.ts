import { MessageService } from 'primeng/api';
import { Joke } from 'src/libs/data/jokes/joke.interface';
import {
  jokeMock,
  jokeToRemoveMock,
  jokesMock,
} from 'src/libs/data/jokes/joke.mock';
import { FavoriteJokesService } from './favorite-jokes.service';

describe('FavoriteJokesService', () => {
  let service: FavoriteJokesService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
  });

  describe('constructor', () => {
    it('should initialize favoriteJokes$ with the jokes from localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(jokesMock));
      service = new FavoriteJokesService(messageServiceSpy);

      expect(service.favoriteJokes$.value).toEqual(jokesMock);
    });

    it('should initialize favoriteJokes$ with an empty array if localStorage is empty', () => {
      spyOn(localStorage, 'getItem').and.returnValue('');
      service = new FavoriteJokesService(messageServiceSpy);

      expect(service.favoriteJokes$.value).toEqual([]);
    });
  });

  describe('addFavoriteJoke$', () => {
    it('should add a joke to favoriteJokes$ and localStorage if there is space in the storage', (done: DoneFn) => {
      const jokeToAdd = jokesMock[0];
      const initialJokes = [jokesMock[1], jokesMock[2]];
      const resultJokes = [jokesMock[1], jokesMock[2], jokesMock[0]];

      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(initialJokes)
      );
      service = new FavoriteJokesService(messageServiceSpy);
      spyOn(localStorage, 'setItem');

      service.addFavoriteJoke$(jokeToAdd).subscribe((result: boolean) => {
        expect(result).toBeTrue();
        expect(service.favoriteJokes$.value).toEqual(resultJokes);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          service['key'],
          JSON.stringify(resultJokes)
        );
        done();
      });
    });

    it('should NOT add a joke if storage is full', (done: DoneFn) => {
      const jokeToAdd = jokeMock;
      const initialJokes = [...jokesMock];

      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(initialJokes)
      );
      service = new FavoriteJokesService(messageServiceSpy);
      spyOn(localStorage, 'setItem');

      service.addFavoriteJoke$(jokeToAdd).subscribe((result: boolean) => {
        expect(result).toBeFalse();
        expect(service.favoriteJokes$.value).toEqual(initialJokes);
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(messageServiceSpy.add).toHaveBeenCalledWith({
          severity: 'info',
          summary: 'Too many jokes',
          detail: 'You can add only 10 jokes to favorite',
        });
        done();
      });
    });
  });

  describe('removeFavoriteJoke', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
    });

    it('should remove a joke from the list of favorite jokes', (done: DoneFn) => {
      const initialJokes = [...jokesMock];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(initialJokes)
      );
      service = new FavoriteJokesService(messageServiceSpy);
      const resultLength = 9;

      service.removeFavoriteJoke(jokeToRemoveMock);

      service.favoriteJokes$.subscribe((jokes: Joke[]) => {
        expect(jokes.length).toBe(resultLength);
        expect(jokes).not.toContain(jokeToRemoveMock);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          service['key'],
          JSON.stringify(jokes)
        );
        done();
      });
    });

    it('should not remove a joke if it is not in the list of favorite jokes if there is no joke in the list', (done: DoneFn) => {
      const initialJokes = [...jokesMock];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(initialJokes)
      );
      service = new FavoriteJokesService(messageServiceSpy);

      service.removeFavoriteJoke(jokeMock);

      service.favoriteJokes$.subscribe((jokes: Joke[]) => {
        expect(jokes.length).toBe(initialJokes.length);
        expect(jokes).toEqual(initialJokes);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          service['key'],
          JSON.stringify(initialJokes)
        );
        done();
      });
    });
  });
});
