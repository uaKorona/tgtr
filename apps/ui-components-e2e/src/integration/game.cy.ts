describe('Game Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tgtrgamecomponent--primary'));

  it('should render the component', () => {
    cy.get('tgtr-game').should('exist');
  });

  it('should detect clicks on the delete button', () => {
    cy.storyAction('click');
    cy.get('.btn--danger').click();
    cy.get('@click').should('have.been.calledOnce');
  });

  it('should detect clicks on the complete button', () => {
    cy.storyAction('click');
    cy.get('.btn--primary').click();
    cy.get('@click').should('have.been.calledOnce');
  });
});
