import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Joke } from 'src/libs/data/jokes/joke.interface';
import {
  jokeMock,
  jokeToRemoveMock,
  jokesMock,
} from 'src/libs/data/jokes/joke.mock';
import { JokesDataService } from 'src/libs/data/jokes/jokes-data.service';
import { FavoriteJokesService } from 'src/libs/domain/favorite-jokes/favorite-jokes.service';
import { JOKES_INTERVAL, RandomListComponent } from './random-list.component';

describe('RandomListComponent', () => {
  let component: RandomListComponent;
  let jokesDataServiceSpy: jasmine.SpyObj<JokesDataService>;
  let favoriteJokesServiceSpy: jasmine.SpyObj<FavoriteJokesService>;

  beforeEach(() => {
    jokesDataServiceSpy = jasmine.createSpyObj('JokesDataService', [
      'getJokes$',
    ]);
    jokesDataServiceSpy.getJokes$.and.returnValue(of(jokeMock));

    favoriteJokesServiceSpy = jasmine.createSpyObj('FavoriteJokesService', [
      'addFavoriteJoke$',
    ]);
    favoriteJokesServiceSpy.addFavoriteJoke$.and.returnValue(of(true));

    component = new RandomListComponent(
      jokesDataServiceSpy,
      favoriteJokesServiceSpy
    );
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('addToFavorite', () => {
    const joke = jokeMock;

    beforeEach(() => {
      spyOn(component, 'removeJokeFromList' as never);
    });

    it('should call addFavoriteJoke$ and remove joke from list if added successfully', () => {
      component.addToFavorite(joke);

      expect(favoriteJokesServiceSpy.addFavoriteJoke$).toHaveBeenCalledWith(
        joke
      );
      expect(component['removeJokeFromList']).toHaveBeenCalledWith(joke);
    });

    it('should not remove joke from list if jokw was not added successfully', () => {
      favoriteJokesServiceSpy.addFavoriteJoke$.and.returnValue(of(false));

      component.addToFavorite(joke);

      expect(favoriteJokesServiceSpy.addFavoriteJoke$).toHaveBeenCalledWith(
        joke
      );
      expect(component['removeJokeFromList']).not.toHaveBeenCalled();
    });
  });

  describe('removeJokeFromList', () => {
    it('should remove joke from list', () => {
      component.jokes$.next(jokesMock);
      component.addToFavorite(jokeToRemoveMock);

      component.jokes$.subscribe((updatedJokes) => {
        expect(updatedJokes.length).toBe(9);
        expect(updatedJokes[0].id).toBe(jokesMock[1].id);
      });
    });
  });

  describe('onStartIntervalControlChange', () => {
    const currentJokes = [...jokesMock];

    beforeEach(() => {
      component.ngOnInit();
    });

    it('should start interval when toggle is true', fakeAsync(() => {
      component.jokes$.next(currentJokes);
      spyOn(component.jokes$, 'next');
      component.startIntervalControl.setValue(true);
      tick(JOKES_INTERVAL);
      expect(component.jokes$.next).toHaveBeenCalledWith([
        { id: 'f', value: 'test joke 6' },
        { id: 'g', value: 'test joke 7' },
        { id: 'h', value: 'test joke 8' },
        { id: 'i', value: 'test joke 9' },
        { id: 'j', value: 'test joke 10' },
      ] as never as Joke[]);
      component.startIntervalControl.setValue(false);
    }));

    it('should NOT start interval when toggle is false', fakeAsync(() => {
      component.jokes$.next(currentJokes);
      spyOn(component.jokes$, 'next');
      component.startIntervalControl.setValue(true);
      component.startIntervalControl.setValue(false);
      expect(component.jokes$.next).not.toHaveBeenCalled();
    }));

    it('should NOT emit jokes if jokes list is not full', fakeAsync(() => {
      component.jokes$.next([jokeMock]);
      spyOn(component.jokes$, 'next');
      component.startIntervalControl.setValue(true);
      tick(JOKES_INTERVAL);
      expect(component.jokes$.next).not.toHaveBeenCalled();
      component.startIntervalControl.setValue(false);
    }));
  });
});
