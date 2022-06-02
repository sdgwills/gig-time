//matt these are my tests love me 

describe('gig Wizard Inputs', () => {
  it('gets input', () => {
    const input = 'A new Gig Name'
    cy.visit('/wizard')
    cy.get('.gigName').type(input).should('have.value', input)
  });
});


//gig wizard cancel button routes to user home 

describe('gig Wizard cancel button routes to homepage', () => {
  cy.visit('/wizard')
  cy.get('#cancelButton').click().should(cy.route('/userHome'))

})

describe('task inputs work', () => {
  it('you can input text into a task', () => {
    const taskInput = 'fawoifjweofijawefoaiwjefoaiwjfeoaiwf'
    cy.visit('/taskwizard/41')
    cy.get('.text_task_container').type(taskInput).should('have.value', taskInput)
  });
});

describe('register page contains a form', () => {
  cy.visit('/register')

  cy.contains('Register for GigTime')

})


describe('logout button works ', () => {
  it('login', () => {

    const text = 'j@j.com';
    const pass = 'thejoyformidable';
    cy.visit('/');
    cy.get('[type="password"]').type(pass).should('have.value', pass);
    cy.get('.loginJacob > :nth-child(3)').click();
    cy.get('.logout_button').click()

  })
});