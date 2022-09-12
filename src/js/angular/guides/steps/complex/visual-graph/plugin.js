PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'visual-graph',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        label: 'menu_explore_visual_graph',
                        menuSelector: 'menu-explore',
                        submenuSelector: 'sub-menu-visual-graph'
                    }, options)
                }, {
                    guideBlockName: 'input-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual_graph_input_IRI.title',
                        content: 'guide.step_plugin.visual_graph_input_IRI.content',
                        forceReload: true,
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector('graphVisualisationSearchInputNotConfigured', ' input'),
                        onNextValidate: (step) => GuideUtils.validateTextInput(step.elementSelector, step.easyGraphInputText)
                    }, options)
                }, {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual_graph_show_autocomplete.title',
                        content: 'guide.step_plugin.visual_graph_show_autocomplete.content',
                        url: '/graphs-visualizations',
                        elementSelector: GuideUtils.getGuideElementSelector(`autocomplete-${options.clickOnIRI}`),
                        onNextClick: (guide, step) => {
                            $(step.elementSelector).trigger('click');
                        },
                        canBePaused: false,
                        forceReload: true
                    }, options)
                }
            ]
        }
    },
    {
        guideBlockName: 'visual-graph-expand',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            const elementSelector = `.node-wrapper[id^="${options.clickOnIRI}"] circle`;
            const step = {
                guideBlockName: 'read-only-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-expand.title',
                    content: 'guide.step_plugin.visual-graph-expand.content',
                    url: '/graphs-visualizations',
                    elementSelector,
                    canBePaused: false,
                    advanceOn: {
                        selector: `.node-wrapper[id^="${options.clickOnIRI}"] circle`,
                        event: 'dblclick'
                    },
                    onNextClick: (guide, step) => {
                        if (!options.disabled) {
                            GuideUtils.graphVizExpandNode(step.elementSelector);
                        }
                        guide.next();
                    },
                    beforeShowPromise: () => {
                        if (GuideUtils.isVisible(elementSelector)) {
                            return new Promise((resolve => {
                                resolve()
                            }));
                        }
                        return GuideUtils.awaitAlphaDropD3($rootScope);
                    }
                }, options)
            };
            return [step]
        }
    },
    {
        guideBlockName: 'visual-graph-link',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $translate = services.$translate;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: '',
                        content: GuideUtils.translateLocalMessage($translate, options.content),
                        url: '/graphs-visualizations',
                        elementSelector: `.link-wrapper[id^="${options.fromIRI}>${options.toIRI}"] text`,
                        canBePaused: false,
                    }, options)
                }
            ];
        }
    },
    {
        guideBlockName: 'visual-graph-open-properties',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [{
                guideBlockName: 'read-only-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-properties.title',
                    content: 'guide.step_plugin.visual-graph-properties.content',
                    url: '/graphs-visualizations',
                    elementSelector: `.node-wrapper[id^="${options.IRI}"] circle`,
                    canBePaused: false,
                    advanceOn: {
                        selector: `.node-wrapper[id^="${options.IRI}"] circle`,
                        event: 'click'
                    },
                    showOn: () => {
                        if (GuideUtils.isGuideElementVisible('close-info-panel')) {
                            GuideUtils.clickOnGuideElement('close-info-panel')();
                        }
                        return true;
                    },
                    onNextClick: (guide, step) => {
                        GuideUtils.graphVizShowNodeInfo(step.elementSelector);
                        guide.next();
                    }
                }, options)
            }];
        }
    },
    {
        guideBlockName: 'visual-graph-type',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [{
                guideBlockName: 'read-only-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-type.content',
                    content: 'guide.step_plugin.visual-graph-type.content',
                    url: '/graphs-visualizations',
                    elementSelector: GuideUtils.getGuideElementSelector('node-types'),
                    placement: 'left',
                    canBePaused: false,
                    beforeShowPromise: GuideUtils.deferredShow(1000),
                }, options)
            }];
        }
    },
    {
        guideBlockName: 'visual-graph-property',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $translate = services.$translate;
            return [{
                guideBlockName: 'read-only-element',
                options: angular.extend({}, {
                    title: GuideUtils.translateLocalMessage($translate, options.title),
                    content: GuideUtils.translateLocalMessage($translate, options.content),
                    url: '/graphs-visualizations',
                    elementSelector: GuideUtils.getGuideElementSelector(`property-${options.shortIRI}`),
                    placement: 'left',
                    canBePaused: false,
                    beforeShowPromise: () => {
                        if (GuideUtils.isVisible(GuideUtils.getGuideElementSelector(`property-${options.shortIRI}`))) {
                            return new Promise(resolve => {
                                resolve()
                            });
                        }
                        return GuideUtils.deferredShow(1000);
                    },
                    onNextClick: (guide) => {
                        guide.next();
                    }
                }, options)
            }];
        }
    },
    {
        guideBlockName: 'visual-graph-property-close',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            return [{
                guideBlockName: 'clickable-element',
                options: angular.extend({}, {
                    title: 'guide.step_plugin.visual-graph-property-close.title',
                    content: 'guide.step_plugin.visual-graph-property-close.content',
                    url: '/graphs-visualizations',
                    elementSelector: GuideUtils.getGuideElementSelector('close-info-panel'),
                    placement: 'left',
                    canBePaused: false,
                    onNextClick: (guide) => {
                        GuideUtils.clickOnGuideElement('close-info-panel')();
                        guide.next();
                    }
                }, options)
            }];
        }
    },
    {
        guideBlockName: 'visual-graph-properties',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const $rootScope = services.$rootScope;
            return [
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties.title',
                        content: 'guide.step_plugin.visual-graph-properties.content',
                        url: '/graphs-visualizations',
                        elementSelector: `.node-wrapper[id^="${options.clickOnIRI}"] circle`,
                        advanceOn: {
                            selector: `.node-wrapper[id^="${options.clickOnIRI}"] circle`,
                            event: 'click'
                        },
                        onNextClick: (guide, step) => {
                            GuideUtils.graphVizShowNodeInfo(step.elementSelector);
                            guide.next();
                        },
                        beforeShowPromise: GuideUtils.awaitAlphaDropD3($rootScope),
                        canBePaused: false,
                    }, options)
                },
                {
                    // rdf-info-side-panel, node-info
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        title: 'guide.step_plugin.visual-graph-properties-side-panel.title',
                        content: 'guide.step_plugin.visual-graph-properties-side-panel.content',
                        url: '/graphs-visualizations',
                        elementSelector: '.rdf-info-side-panel',
                        placement: 'left',
                        beforeShowPromise: GuideUtils.deferredShow(500),
                        advanceOn: {
                            selector: GuideUtils.getGuideElementSelector('close-info-panel'),
                            event: 'click'
                        },
                        onNextClick: () => {
                            $(GuideUtils.getGuideElementSelector('close-info-panel')).trigger('click');
                        },
                        canBePaused: false,
                    }, options)
                }
            ]
        }
    }
]);
