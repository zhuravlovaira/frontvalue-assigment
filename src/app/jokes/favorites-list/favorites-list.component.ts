import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from 'src/libs/data/jokes/joke.interface';
import { FavoriteJokesService } from 'src/libs/domain/favorite-jokes/favorite-jokes.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  favoriteJokes$: Observable<Joke[]> =
    this.favoriteJokesService.getFavoriteJokes$();

  constructor(private readonly favoriteJokesService: FavoriteJokesService) {}

  removeFromFavorite(joke: Joke) {
    this.favoriteJokesService.removeFavoriteJoke(joke);
  }
}
