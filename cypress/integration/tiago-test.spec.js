describe ('First Test', () => {
  it ('is working', () => {
    expect (true).to.equal (true);
  });
});


describe ('Second Test', () => {
  it ('Visit the app', () => {
    cy.visit ('/');
  });
});

describe ('Third Test', () => {
  it ('Focus on the input', () => {
    cy.visit ('/');
    cy.focused ().should ('have.class', 'newTask');
  });
});

describe ('input email', () => {
  it ('Accepts input', () => {
    const text = 'j@j.com';
    cy.visit ('/');
    cy.get ('.newTask').type (text).should ('have.value', text);
  });
});

describe ('input passwod', () => {
  it ('Accepts input', () => {
    const text = 'thejoyformidable';
    cy.visit ('/');
    cy.get('[type="password"]').type (text).should ('have.value', text);
  });
});

describe ('input username and password and logs in', () => {
  it ('login', () => {
    const text = 'j@j.com';
    const pass = 'thejoyformidable';
    cy.visit ('/');
    cy.get ('.newTask').type (text).should ('have.value', text);
    cy.get('[type="password"]').type (pass).should ('have.value', pass);
    cy.get('.loginJacob > :nth-child(3)').click();
    
  });
});


