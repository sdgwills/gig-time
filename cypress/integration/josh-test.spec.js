

describe("log into website, click on gigs", () => {
    beforeEach(() => {
        cy.visit("/")
        const text = 'j@j.com';
        const pass = 'thejoyformidable';
        cy.get ('.newTask').type (text).should ('have.value', text);
        cy.get('[type="password"]').type (pass).should ('have.value', pass);
        cy.get('.loginJacob > :nth-child(3)').click();
    })
    it("be able to select a gig from the mapped out gigs", () => {
        cy.get("[style='display: flex; justify-content: space-around; flex-wrap: wrap;'] > :nth-child(1)").click()
    })
    it("be able to select the 9th gig that will lead to correct gig", () => {
        cy.get("[style='display: flex; justify-content: space-around; flex-wrap: wrap;'] > :nth-child(10)").click()
    })
    it("select 9th gig and expand task view", () => {
        cy.get("[style='display: flex; justify-content: space-around; flex-wrap: wrap;'] > :nth-child(10)").click()
        cy.get(":nth-child(1) > :nth-child(1) > div > button").click()
    })
    it("after expand task view start and stop timer", () => {
        cy.get("[style='display: flex; justify-content: space-around; flex-wrap: wrap;'] > :nth-child(10)").click()
        cy.get(":nth-child(1) > :nth-child(1) > div > button").click()
        cy.get('[style="border: solid;"] > div > :nth-child(2)').click()
        cy.get('[style="border: solid;"] > div > button').click()
        cy.get('[style="border: solid;"] > div > :nth-child(4)').click()
    })
    it("after timer has gone on break, minimize the task", () => {
        cy.get("[style='display: flex; justify-content: space-around; flex-wrap: wrap;'] > :nth-child(10)").click()
        cy.get(":nth-child(1) > :nth-child(1) > div > button").click()
        cy.get('[style="border: solid;"] > div > :nth-child(2)').click()
        cy.get('[style="border: solid;"] > div > button').click()
        cy.get('[style="border: solid;"] > div > :nth-child(4)').click()
        cy.get(':nth-child(1) > [style="border: solid;"] > :nth-child(4)').click()
    })
})