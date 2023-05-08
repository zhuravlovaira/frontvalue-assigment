import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { FavoriteJokesService } from 'src/libs/domain/favorite-jokes/favorite-jokes.service';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { JokesComponent } from './jokes.component';
import { RandomListComponent } from './random-list/random-list.component';

@NgModule({
  declarations: [JokesComponent, RandomListComponent, FavoritesListComponent],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    InputSwitchModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
  ],
  exports: [JokesComponent],
  providers: [MessageService, FavoriteJokesService],
})
export class JokesModule {}
