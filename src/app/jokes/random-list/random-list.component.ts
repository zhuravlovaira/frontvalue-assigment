import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  NEVER,
  Observable,
  Subject,
  filter,
  interval,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Joke } from 'src/libs/data/jokes/joke.interface';
import { JokesDataService } from 'src/libs/data/jokes/jokes-data.service';

const MAX_JOKES = 10;
const NEW_JOKES_AMOUNT = 5;
const JOKES_INTERVAL = 5000;

@Component({
  selector: 'app-random-list',
  templateUrl: './random-list.component.html',
  styleUrls: ['./random-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  readonly jokes$ = new BehaviorSubject<Joke[]>([]);
  readonly newJokesAmount = NEW_JOKES_AMOUNT;

  startIntervalControl = new FormControl<boolean>(false);

  readonly jokesStream$: Observable<[Joke, Joke[]]> = this.jokes$.pipe(
    takeUntil(this.destroy$),
    filter((jokes: Joke[]) => jokes.length < MAX_JOKES),
    switchMap(() => this.jokesDataService.getJokes$()),
    withLatestFrom(this.jokes$),
    tap(([joke, jokes]: [Joke, Joke[]]) => {
      this.jokes$.next([...jokes, joke]);
    })
  );

  constructor(private readonly jokesDataService: JokesDataService) {}

  ngOnInit(): void {
    this.onStartIntervalControlChange();
  }

  private onStartIntervalControlChange() {
    this.startIntervalControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((start: boolean | null) =>
          start ? interval(JOKES_INTERVAL) : NEVER
        ),
        withLatestFrom(this.jokes$),
        filter(([, jokes]: [number, Joke[]]) => jokes.length >= MAX_JOKES)
      )
      .subscribe(([, jokes]: [number, Joke[]]) => {
        jokes.splice(0, NEW_JOKES_AMOUNT);
        this.jokes$.next(jokes);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
