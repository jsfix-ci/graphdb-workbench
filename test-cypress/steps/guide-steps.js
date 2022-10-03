const COMMAND_TIMEOUT = 10000;

class GuideSteps {
    static visitGuidesPage() {
        cy.get('[guide-selector="menu-help"]').click();
        cy.get('[guide-selector="sub-menu-guide"]').click();
    }

    static runGuide(guideName) {
        cy.contains('td', guideName)
            .parent()
            .within($tr => {
                cy.get('.btn').click();
            });
    }

    static cancelGuide() {
        cy.get('.shepherd-cancel-icon:visible', {timeout: COMMAND_TIMEOUT}).click();
    }

    static verifyPageNotInteractive() {
        cy.get('.shepherd-modal-is-visible', {timeout: COMMAND_TIMEOUT});
    }

    static clickOnNextButton(stepIndex, waitForAnimations = false) {
        cy.get(`[data-shepherd-step-id="${stepIndex}"] footer button:visible`, {timeout: COMMAND_TIMEOUT}).contains('Next').click({waitForAnimations});
    }

    static verifyIsElementInteractable(selector) {
        cy.get(selector).should('be.visible', {timeout: COMMAND_TIMEOUT});
    }

    static clickOnMenuSetup() {
        cy.get('[guide-selector="menu-setup"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnSubMenuRepositories() {
        cy.get('[guide-selector="sub-menu-repositories"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnOpenCreateRepositoryFormButton() {
        cy.get('[guide-selector="createRepository"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnCreateRepositoryButton() {
        cy.get('[guide-selector="graphDBRepositoryCrateButton"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnGraphDBRepositoryButton() {
        cy.get('[guide-selector="createGraphDBRepository"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnChooseRepositoryButton() {
        cy.get('[guide-selector="repositoriesGroupButton"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnSelectRepositoryButton(repositoryId) {
        cy.get(`[guide-selector="repository-${repositoryId}-button"]`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnSubMenuAutocompleteButton() {
        cy.get('[guide-selector="sub-menu-autocomplete"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnEnableAutocompleteButton() {
        cy.get('[guide-selector="autocompleteCheckbox"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnMenuImportButton() {
        cy.get('[guide-selector="menu-import"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnImportRepositoryRdfFileButton(rdfFileName) {
        cy.get(`[guide-selector="import-file-${rdfFileName}"]`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnImportButton() {
        cy.get(`[guide-selector="import-settings-import-button"]`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnMenuExploreButton() {
        cy.get(`[guide-selector="menu-explore"]`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnSubMenuVisualGraphButton() {
        cy.get(`[guide-selector="sub-menu-visual-graph"]`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnVisualGraphNodeButton(iri) {
        cy.get(`.node-wrapper[id^="${iri}"] circle`, {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnClosePropertiesInfoPanelButton() {
        cy.get('[guide-selector="close-info-panel"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnMenuSparqlButton() {
        cy.get('[guide-selector="menu-sparql"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static clickOnSaprqlRunButton() {
        cy.get('[guide-selector="runSparqlQuery"]', {timeout: COMMAND_TIMEOUT}).click();
    }

    static dblclickOnVisualGraphNodeButton(iri) {
        cy.get(`.node-wrapper[id^="${iri}"] circle`, {timeout: COMMAND_TIMEOUT}).dblclick();
    }

    static typeToRepositoryIdField(repositoryId) {
        cy.get('[guide-selector="graphDBRepositoryIdInput"]', {timeout: COMMAND_TIMEOUT}).type(repositoryId);
    }

    static typetToSearchRdfResources(input) {
        cy.get('[guide-selector="graphVisualisationSearchInputNotConfigured"] input', {timeout: COMMAND_TIMEOUT}).type(input);
    }

    static waitDialogWithTitleBeVisible(text, stepIndex) {
        cy.get(`[data-shepherd-step-id="${stepIndex}"]:visible`, {timeout: COMMAND_TIMEOUT}).contains(text);
    }

    static uploadFile(fileName) {
        cy.get('#ngf-wb-import-uploadFile', {timeout: COMMAND_TIMEOUT})
            .attachFile(`guides/${fileName}`);
        // Wait until import button appeared.
        cy.get(`[guide-selector="import-file-${fileName}"]`, {timeout: COMMAND_TIMEOUT});
    }

    static verifyIsNotElementInteractable(selector) {
        cy.get(selector, {timeout: COMMAND_TIMEOUT}).should('not.be.visible');
    }

    static verifyNextButtonNotVisible() {
        cy.get('.shepherd-content:visible .shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Next').should('not.exist');
    }

    static verifyNextButtonIsVisible() {
        cy.get('.shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Next').should('have.length', 1);
    }

    static clickOnPreviousButton(stepIndex) {
        cy.get(`[data-shepherd-step-id="${stepIndex}"] footer button:visible`, {timeout: COMMAND_TIMEOUT}).contains('Previous').click({waitForAnimations: false});
    }

    static clickOnPauseButton() {
        cy.get('.shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Pause').click({waitForAnimations: false});
    }

    static verifyPauseButtonNotVisible() {
        cy.get('.shepherd-content:visible .shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Pause').should('not.exist');
    }

    static clickOnSkipButton() {
        cy.get('.shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Skip').click({waitForAnimations: false});
    }

    static verifySkipButtonNotVisible() {
        cy.get('.shepherd-content:visible .shepherd-button:visible', {timeout: COMMAND_TIMEOUT}).contains('Pause').should('not.exist');
    }
}

export default GuideSteps;
