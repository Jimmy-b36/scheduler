/* eslint-disable no-undef */
describe('Navigator', () => {
  it('should navigate to Tuesday', () => {
    cy.visit('/');

    cy.contains('[data-cypress=day]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});
