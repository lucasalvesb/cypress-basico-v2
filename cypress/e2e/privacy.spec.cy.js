

it('Testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
      .contains('Talking About Testing').should('be.visible')
  })



  //como eu tinha feito 
  
  //    .get('#white-background p:first-of-type')
  //    .contains('Não salvamos')