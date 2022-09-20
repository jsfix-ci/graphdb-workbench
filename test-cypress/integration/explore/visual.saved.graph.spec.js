describe.only('Visual saved graph screen validation', () => {

    let repositoryId = 'graphRepo' + Date.now();

    before(() => {
        cy.clearLocalStorage('ls.graphs-viz');
        repositoryId = 'repo' + Date.now();
        cy.createRepository({id: repositoryId});
        cy.presetRepository(repositoryId);
    });

    after(() => {
        cy.clearLocalStorage('ls.graphs-viz');
        cy.setDefaultUserData();
        cy.deleteRepository(repositoryId);
    });

    it('CRUD on saved graph', () => {
        //Creates saved graph
        cy.visit('graphs-visualizations');
        getCreateCustomGraphLink().click();
        cy.url().should('include', '/config/save');
        getGraphConfigName().type('MyGraphConfig');
        cy.get('[data-cy="check-box-success-query"]').check();
        cy.get('[data-cy="set-query"]').click();
        getSaveConfig().click();
        cy.url().should('include', 'graphs-visualizations');
        cy.get('[data-cy="starting-point-query-results"]').first().click();
        cy.url().should('include', 'graphs-visualizations?config=');
        cy.get('[data-cy="save-or-update-graph"]').click()
            .get( '[id="wb-graphviz-savegraph-name"]').type('myGraph')
            .get('[id="wb-graphviz-savegraph-submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Saved graph myGraph was saved');
            });
        //Visualize saved graph
        cy.visit('graphs-visualizations');
        cy.get('[data-cy="saved-advanced-graph"]').first().click();
        cy.url().should('include', 'graphs-visualizations?saved=');
        //Finds the button "Get URL to Graph" and opens the modal form "Copy URL to clipboard"
        cy.visit('graphs-visualizations');
        cy.get('[data-cy="saved-advanced-graph"]')
            .get('[data-cy="copy-to-clipboard-saved-graph"]').first().click()
            .get( '[id="copyToClipboardForm"]').contains('Copy URL to clipboard');
        //Finds the button "Rename Graph" and opens the modal form "Rename saved graph"
        cy.visit('graphs-visualizations');
        cy.get('[data-cy="saved-advanced-graph"]')
            .get('[data-cy="rename-saved-graph"]').first().click()
            .get( '[id="saveGraphForm"]');
        //Renames saved graph
        cy.visit('graphs-visualizations');
        cy.get('[data-cy="saved-advanced-graph"]')
            .get('[data-cy="rename-saved-graph"]').first().click()
            .get( '[id="saveGraphForm"]')
            .get('[id="wb-graphviz-savegraph-name"]').clear().type('myRenamedGraph')
            .get('[id="wb-graphviz-savegraph-submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Saved graph myRenamedGraph was edited.');
            });
        //Deletes saved graph
        cy.visit('graphs-visualizations');
        cy.get('[data-cy="saved-advanced-graph"]')
                .get('[data-cy="delete-saved-graph"]').first().click({force:true});
            confirmDelete();
    });

    function getCreateCustomGraphLink() {
        return cy.get('.create-graph-config').should('be.visible');
    }

    function getGraphConfigName() {
        return cy.get('.graph-config-name').should('be.visible');
    }

    function getSaveConfig() {
        return cy.get('.btn-save-config').should('be.visible');
    }

    function confirmDelete() {
        cy.get('.modal-footer .confirm-btn').click();
        cy.get('.modal').should('not.exist');
    }
});
