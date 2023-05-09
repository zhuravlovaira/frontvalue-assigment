import { Joke } from './joke.interface';

export const jokeMock: Joke = {
  categories: [],
  created_at: '2020-01-05 13:42:28.420821',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: '_oCRwevzRiy9fUhimmFatQ',
  updated_at: '2020-01-05 13:42:28.420821',
  url: 'https://api.chucknorris.io/jokes/_oCRwevzRiy9fUhimmFatQ',
  value:
    'The fatalities in Mortal Kombat are just reenactments of Chuck Norris going ape shit durring a traffic jam.',
};

export const jokesMock = [
  { id: 'a', value: 'test joke 1' },
  { id: 'b', value: 'test joke 2' },
  { id: 'c', value: 'test joke 3' },
  { id: 'd', value: 'test joke 4' },
  { id: 'e', value: 'test joke 5' },
  { id: 'f', value: 'test joke 6' },
  { id: 'g', value: 'test joke 7' },
  { id: 'h', value: 'test joke 8' },
  { id: 'i', value: 'test joke 9' },
  { id: 'j', value: 'test joke 10' },
] as never as Joke[];

export const jokeToRemoveMock = {
  id: 'a',
  value: 'test joke 1',
} as never as Joke;
