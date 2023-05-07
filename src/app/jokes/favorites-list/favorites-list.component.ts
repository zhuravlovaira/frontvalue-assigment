import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {}
