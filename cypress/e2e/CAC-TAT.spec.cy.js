
/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
})




  it('Verifica o título da aplicação', function() {
    cy.title()
      .should('eq', 'Central de Atendimento ao Cliente TAT')
  })



  it('Preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName')
      .type('Lucas', {delay:0})
    cy.get('#lastName')
      .type('Barbosa', {delay:0})
    cy.get('#email')
      .type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area')
      .type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('.button')
      .click()
    cy.get('.success')
      .should('be.visible')
  })


  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName')
      .type('Lucas', {delay:0})
    cy.get('#lastName')
      .type('Barbosa', {delay:0})
    cy.get('#email')
      .type('lucasalves94@gmail,com', {delay:0})
    cy.get('#open-text-area')
      .type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('.button')
      .click()
    cy.get('.error')
      .should('be.visible')
  })

//

  it('Preenche os campos obrigatórios e depois preenche o número de telefone com letras, deve ficar vazio', function() {
    cy.get('#firstName')
      .type('Lucas', {delay:0})
    cy.get('#lastName')
      .type('Barbosa', {delay:0})
    cy.get('#email')
      .type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area')
      .type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('#phone')
      .type('lukos')
      .should('have.value', '')
  })


//
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName')
      .type('Lucas', {delay:0})
    cy.get('#lastName')
      .type('Barbosa', {delay:0})
    cy.get('#email')
      .type('lucasalves94@gmail.com', {delay:0})
    cy.get('#open-text-area')
      .type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
    cy.get('#phone-checkbox')
      .check()
    cy.get('.button')
      .click()
    cy.get('.error')
      .should('be.visible')
  })


//preenche e limpa os campos obrigatórios e checa ambos 

  it('Checagem de campos obrigatórios preenchidos e vazios', function() {
    cy.get('#firstName')
      .type('Lucas', {delay:0})
      .should('have.value', 'Lucas')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Barbosa', {delay:0})
      .should('have.value', 'Barbosa')
      .clear().
      should('have.value', '')
    cy.get('#email')
      .type('lucasalves94@gmail.com', {delay:0})
      .should('have.value', 'lucasalves94@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!', {delay:0})
      .should('have.value', 'Rapaz, eu gostaria de comprar um celta 2004, preto, rebaixado, quatro portas. Se for possível!')
      .clear()
      .should('have.value', '')    
  })


//não preenche nada, só tenta enviar o formulário


  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('.button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
  })




  it('Envia o formulário usando comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('.success', 'Mensagem enviada com sucesso')
      .should('be.visible')
  })
  
  it('Seleciona um produto por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto por seu value', function () {
    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto por seu índice', function () {
    cy.get('#product')
      .select(3)
      .should('contain', 'Mentoria')
  })

  it('Marca o tipo de atendimento feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })

  })

  it('Marca ambos chechkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    
  })

  it('Seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })


  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
  })

  

})