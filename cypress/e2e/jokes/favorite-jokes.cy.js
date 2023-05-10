/// <reference types="cypress" />
import {
  addFirstJokeToFavorite,
  favoriteJokes,
  favoriteJokesTab,
  getJokeAliases,
  maxJokes,
  randomJokesTab,
  removeJokeButton,
  toast,
} from './utils';

describe('Favorite jokes page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('initially displays no jokes', () => {
    favoriteJokesTab().click();
    favoriteJokes().should('not.exist');
  });

  it(`can have maximum of ${maxJokes} favorite jokes and displays info toast if exceeded maximum`, () => {
    const jokeAliases = getJokeAliases();
    cy.wait(jokeAliases).then(() => {
      for (let i = 1; i <= maxJokes; i++) {
        addFirstJokeToFavorite();
      }
      favoriteJokesTab().click();
      favoriteJokes().should('have.length', maxJokes);
      randomJokesTab().click();
      addFirstJokeToFavorite();
      toast().should('exist');
    });
  });

  it('after page realod should desplay jokes from the storage', () => {
    const jokeAliases = getJokeAliases();
    cy.wait(jokeAliases).then(() => {
      for (let i = 1; i <= 3; i++) {
        addFirstJokeToFavorite();
      }
      favoriteJokesTab().click();
      favoriteJokes().should('have.length', 3);
      cy.reload();
      favoriteJokesTab().click();
      favoriteJokes().should('have.length', 3);
    });
  });

  it('can delete jokes', () => {
    const jokeAliases = getJokeAliases();
    cy.wait(jokeAliases).then(() => {
      for (let i = 1; i <= 3; i++) {
        addFirstJokeToFavorite();
      }
      favoriteJokesTab().click();
      favoriteJokes().should('have.length', 3);
      removeJokeButton().first().click();
      favoriteJokes().should('have.length', 2);
      removeJokeButton().first().click();
      favoriteJokes().should('have.length', 1);
    });
  });
});
