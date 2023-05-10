/// <reference types="cypress" />
import {
  addFirstJokeToFavorite,
  favoriteJokes,
  favoriteJokesTab,
  getJokeAliases,
  maxJokes,
  randomJokes,
  toggle,
  waitRandomJokeToLoad,
} from './utils';

describe('Random jokes page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('initially displays no jokes', () => {
    randomJokes().should('not.exist');
  });

  it(`displays up to ${maxJokes} jokes`, () => {
    const jokeAliases = getJokeAliases();
    cy.wait(jokeAliases).then(() => {
      randomJokes().should('have.length', maxJokes);
      randomJokes().should('not.have.length', maxJokes + 1);
    });
  });

  it('adds a joke to the favorites when clicking "Add to favorite" button', () => {
    addFirstJokeToFavorite();
    favoriteJokesTab().click();
    favoriteJokes().should('have.length', 1);
  });

  it('when adding a joke to the favorites, remove the current joke from the random list and request a new one', () => {
    addFirstJokeToFavorite();
    randomJokes().should('have.length', maxJokes - 1);
    waitRandomJokeToLoad(10);
  });

  context('Toggle', () => {
    const newJokesAmount = 5;

    beforeEach(() => {
      const jokeAliases = getJokeAliases();
      cy.wait(jokeAliases).then(() => {
        toggle().click();
      });
    });

    it(`requests ${newJokesAmount} new jokes each 5 seconds and adds them to the the list in place of oldest jokes`, () => {
      let firstJokeId;
      let fifthJokeId;
      let tenthJokeId;

      randomJokes()
        .first()
        .invoke('attr', 'id')
        .then((id) => {
          firstJokeId = id;
          return randomJokes().eq(newJokesAmount).invoke('attr', 'id');
        })
        .then((id) => {
          fifthJokeId = id;
          cy.wait(5000);
          cy.get(`[id="${fifthJokeId}"]`).should('exist');
          randomJokes().first().invoke('attr', 'id').should('eq', fifthJokeId);
          cy.get(`[id="${firstJokeId}"]`).should('not.exist');
          return randomJokes().eq(newJokesAmount).invoke('attr', 'id');
        })
        .then((id) => {
          tenthJokeId = id;
          cy.wait(5000);
          cy.get(`[id="${tenthJokeId}"]`).should('exist');
          randomJokes().first().invoke('attr', 'id').should('eq', tenthJokeId);
          cy.get(`[id="${fifthJokeId}"]`).should('not.exist');
        });
    });

    it(`does not request ${newJokesAmount} new jokes if toggle is off`, () => {
      toggle().click();

      let firstJokeId;
      let fifthJokeId;

      randomJokes()
        .first()
        .invoke('attr', 'id')
        .then((id) => {
          firstJokeId = id;
          return randomJokes().eq(newJokesAmount).invoke('attr', 'id');
        })
        .then((id) => {
          fifthJokeId = id;
          cy.wait(5000);
          randomJokes().first().invoke('attr', 'id').should('eq', firstJokeId);
          randomJokes()
            .eq(newJokesAmount)
            .invoke('attr', 'id')
            .should('eq', fifthJokeId);
        });
    });
  });
});
