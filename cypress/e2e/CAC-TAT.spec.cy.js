
/// <reference types="Cypress" />

beforeEach (() => {
  cy.visit('./src/index.html')
})

//checar se o título corresponde
describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})

//preenche campos obrigatórios e envia o formulário com SUCESSO
describe('Preenche os campos obrigatórios e envia o formulário', function() {
  it('preenche os campos', function() {
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Barbosa', {delay:0})
    cy.get('#email').type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })
})

//preenche campos obrigatórios e envia o formulário com ERRO NO EMAIL
describe('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
  it('erro no email', function() {
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Barbosa', {delay:0})
    cy.get('#email').type('lucasalves94@gmail,com', {delay:0})
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })
})