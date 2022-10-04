Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Barbosa', {delay:0})
    cy.get('#email').type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('.button').click()
})