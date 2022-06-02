describe("log into website, click on gigs", () => {
  it('login', () => {
    cy.visit("/")
    const text = 'j@j.com';
    const pass = 'thejoyformidable';
    cy.get ('.newTask').type (text).should ('have.value', text);
    cy.get('[type="password"]').type (pass).should ('have.value', pass);
    cy.get('.loginJacob > :nth-child(3)').click();
  })
  it("be able to select a gig from the mapped out gigs", () => {
    cy.get('.user_home_main_container > :nth-child(3)').click();
  })
  it('click send update to client button and have it send', () => {
    cy.get('.button_task_container > button').click();
  })
  it('toggle paid button', () => {
    cy.get(':nth-child(8) > [style="position: relative; display: inline-block; text-align: left; opacity: 1; direction: ltr; border-radius: 14px; transition: opacity 0.25s ease 0s; touch-action: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); user-select: none;"] > .react-switch-bg').click();
  })
  it('toggle billed button', () => {
    cy.get(':nth-child(10) > .react-switch-bg').click();
  })
  it('open up gig timer', () => {
    cy.get(':nth-child(1) > .container_all_task > .task_card_container_before > .fa-expand-arrows-alt').click();
  })
  it('start gig timer', () => {
    cy.get('.fa-play-circle').click();
  })
  it('pause timer', () => {
    cy.get('.clock > .fas').click();
  })
  it('stop time and add time to total time', () => {
    cy.get('.fa-stop-circle').click();
  })
  it('close gig timer window', () => {
    cy.get('.fa-window-minimize').click();
  })
})