describe('client-feature-login', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=clientfeaturelogincomponent--primary')
  );
  it('should render the component', () => {
    cy.get('tgtr-client-feature-login').should('exist');
  });
});
