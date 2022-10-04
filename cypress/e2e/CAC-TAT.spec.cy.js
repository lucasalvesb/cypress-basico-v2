
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

//preenche os campos obrigatórios e depois preenche o número de telefone com letras, deve ficar vazio
describe('Telefone só aceita números', function() {
  it('telefone inválido', function() {
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Barbosa', {delay:0})
    cy.get('#email').type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('#phone').type('lukos').should('have.value', '')
  })
})

//exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
describe('Meio de contato telefone', function() {
  it('telefone se torna obrigatório', function() {
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Barbosa', {delay:0})
    cy.get('#email').type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('#phone-checkbox').click()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })
})

//preenche e limpa os campos obrigatórios e checa ambos 
describe('Checagem de campos obrigatórios preenchidos e vazios', function() {
  it('preenche e limpa os campos, checando ambos', function() {
    cy.get('#firstName').type('Lucas', {delay:0}).should('have.value', 'Lucas').clear().should('have.value', '')
    cy.get('#lastName').type('Barbosa', {delay:0}).should('have.value', 'Barbosa').clear().should('have.value', '')
    cy.get('#email').type('lucasalves94@gmail.com', {delay:0}).should('have.value', 'lucasalves94@gmail.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0}).should('have.value', 'Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!').clear().should('have.value', '')
    
  })
})

//não preenche nada, só tenta enviar o formulário

describe('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
  it('Campos vazios', function() {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
})


describe('Envia o formulário usando comando customizado', function () {
  it('Comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('.success', 'Mensagem enviada com sucesso').should('be.visible')
  })  
})
