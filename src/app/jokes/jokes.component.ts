import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {}
