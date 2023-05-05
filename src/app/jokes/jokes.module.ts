import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { JokesComponent } from './jokes.component';
import { RandomListComponent } from './random-list/random-list.component';

@NgModule({
  declarations: [JokesComponent, RandomListComponent, FavoritesListComponent],
  imports: [CommonModule],
  exports: [JokesComponent],
})
export class JokesModule {}
