/* eslint-disable no-undef */
describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/').contains('[data-cypress=day]', 'Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt="Add"]').first().click();

    cy.get('[data-testid="student-name-input"]').type('Lydia Miller-Jones');
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains('Save').click();
    cy.contains('Saving');

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('[alt=Edit]').invoke('show').click();

    cy.get('[data-testid="student-name-input"]').clear().type('Steven');
    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains('Save').click();
    cy.contains('Saving');

    cy.contains('.appointment__card--show', 'Steven');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should return to an empty container when cancel is clicked', () => {
    cy.get('[alt="Add"]').first().click();
    cy.contains('Cancel').click();
    cy.contains('[data-testid="student-name-input"]').should('not.exist');
    cy.contains('[data-testid="interviewer-list"]').should('not.exist');
  });

  it('should delete an appointment', () => {
    cy.get('[alt=Delete]').invoke('show').click();
    cy.contains('Confirm').click();

    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
    cy.contains('.appointment__card--show', 'Sylvia Palmer').should(
      'not.exist'
    );
  });
});
