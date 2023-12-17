describe('client-feature-register', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=featureregistercomponent--primary')
  );
  it('should render the component', () => {
    cy.get('tgtr-feature-register').should('exist');
  });
});
