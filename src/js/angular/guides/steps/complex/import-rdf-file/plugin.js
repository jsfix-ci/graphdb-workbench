PluginRegistry.add('guide.step', [
    {
        guideBlockName: 'import-rdf-file',
        getSteps: (options, services) => {
            const GuideUtils = services.GuideUtils;
            const toastr = services.toastr;
            const $translate = services.$translate;
            const $interpolate = services.$interpolate;
            options.mainAction = 'import-file';

            const steps = [
                {
                    guideBlockName: 'click-main-menu',
                    options: angular.extend({}, {
                        menu: 'import',
                        showIntro: false
                    }, options)
                }
            ];

            if (options.resourcePath) {
                steps.push(
                    {
                        guideBlockName: 'download-guide-resource',
                        options: angular.extend({}, {
                            title: ''
                        }, options)
                    }
                );
            }

            steps.push(...[
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.content',
                        url: '/import',
                        elementSelector: GuideUtils.getGuideElementSelector('uploadRdfFileButton'),
                        onNextValidate: () => {
                            if (!$(GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile)).length) {
                                GuideUtils.noNextErrorToast(toastr, $translate, $interpolate,
                                    'guide.step_plugin.import_rdf_file.file-must-be-uploaded', options);
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }, options)
                },
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.import-file.button.content',
                        elementSelector: GuideUtils.getGuideElementSelector('import-file-' + options.resourceFile),
                        url: '/import',
                        placement: 'left',
                        onNextClick: () => GuideUtils.clickOnGuideElement('import-file-' + options.resourceFile)()
                    }, options)
                },
                {
                    guideBlockName: 'clickable-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_rdf_file.import-settings.import.button.content',
                        elementSelector: GuideUtils.getGuideElementSelector('import-settings-import-button'),
                        placement: 'top',
                        onPreviousClick: (guide) => new Promise(function (resolve) {
                            GuideUtils.clickOnGuideElement('import-settings-cancel-button')()
                                .then(() => resolve());
                        }),
                        onNextClick: () => GuideUtils.clickOnGuideElement('import-settings-import-button')(),
                        canBePaused: false
                    }, options)
                },
                {
                    guideBlockName: 'read-only-element',
                    options: angular.extend({}, {
                        content: 'guide.step_plugin.import_status_info.content',
                        url: '/import',
                        elementSelector: GuideUtils.getGuideElementSelector('import-status-info'),
                        onPreviousClick: (guide) => new Promise(function (resolve) {
                            GuideUtils.clickOnGuideElement('import-file-' + options.resourceFile)()
                                .then(() => resolve())
                        }),
                    }, options)
                }
            ]);

            return steps;
        }
    }
]);
