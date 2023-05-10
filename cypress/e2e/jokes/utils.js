export const addJokeButton = () => cy.get('[data-cy="add-joke-button"]');
export const removeJokeButton = () => cy.get('[data-cy="remove-joke-button"]');
export const randomJokes = () => cy.get('[data-cy="random-jokes"]');
export const favoriteJokes = () => cy.get('[data-cy="favorite-jokes"]');
export const toggle = () => cy.get('[data-cy="toggle"]');
export const toast = () => cy.get('[data-cy="toast"]');
export const favoriteJokesTab = () => cy.get('[id="p-tabpanel-1-label"]');
export const randomJokesTab = () => cy.get('[id="p-tabpanel-0-label"]');
export const maxJokes = 10;

export const addFirstJokeToFavorite = () => {
  cy.intercept('GET', 'https://api.chucknorris.io/jokes/random').as('getJoke');
  cy.wait(`@getJoke`).then(() => {
    addJokeButton().first().click();
  });
};

export const waitRandomJokeToLoad = (index = 1) => {
  cy.intercept('GET', 'https://api.chucknorris.io/jokes/random').as('getJoke');
  cy.wait(`@getJoke`).then(() => {
    randomJokes().should('have.length', index);
  });
};

export const getJokeAliases = () => {
  const jokeAliases = [];

  for (let i = 1; i <= maxJokes; i++) {
    const jokeAlias = `getJoke${i}`;
    cy.intercept('GET', 'https://api.chucknorris.io/jokes/random').as(
      jokeAlias
    );
    jokeAliases.push(`@${jokeAlias}`);
  }

  return jokeAliases;
};
