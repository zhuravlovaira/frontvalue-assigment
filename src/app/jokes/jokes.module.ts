import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { JokesComponent } from './jokes.component';
import { RandomListComponent } from './random-list/random-list.component';

@NgModule({
  declarations: [JokesComponent, RandomListComponent, FavoritesListComponent],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  exports: [JokesComponent],
})
export class JokesModule {}
