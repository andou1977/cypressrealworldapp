import {faker} from "@faker-js/faker";
import {BankAccount, User} from "../../../src/models";


const apiBankAccounts = `${Cypress.env("apiUrl")}/bankAccounts`;


type TestBankAccountsCtx = {
    allUsers?: User[];
    authenticatedUser?: User;
    bankAccounts?: BankAccount[];
};



describe('Andou Test Post and userid', function () {
    let ctx: TestBankAccountsCtx = {};


    before(() => {
        // Hacky workaround to have the e2e tests pass when cy.visit('http://localhost:3000') is called
        cy.request("GET", "/");
    });

    beforeEach(function () {
        cy.task("db:seed");

        cy.database("filter", "users").then((users: User[]) => {
            ctx.authenticatedUser = users[0];
            ctx.allUsers = users;

            return cy.loginByApi(ctx.authenticatedUser.username);
        });

        cy.database("filter", "bankaccounts").then((bankAccounts: BankAccount[]) => {
            ctx.bankAccounts = bankAccounts;
        });
    });





    context("POST /bankAccounts", function () {
        it("creates a new bank account", function () {
            const { id: userId } = ctx.authenticatedUser!;

            cy.request("POST", `${apiBankAccounts}`, {
                bankName: `${faker.company.companyName()} Bank`,
                accountNumber: faker.finance.account(10),
                routingNumber: faker.finance.account(9),
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.account.id).to.be.a("string");
                expect(response.body.account.userId).to.eq(userId);
            });
        });
    });

    context("GET /bankAccounts/:bankAccountId", function () {
        it("gets a bank account", function () {
            const { id: userId } = ctx.authenticatedUser!;
            const { id: bankAccountId } = ctx.bankAccounts![0];
            cy.request("GET", `${apiBankAccounts}/${bankAccountId}`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.account.userId).to.eq(userId);
            });
        });
    });



});