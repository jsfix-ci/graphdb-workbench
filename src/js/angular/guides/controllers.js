import Tour from './../../../js/bootstrap-tour-standalone.min';

const modules = [
    'ui.bootstrap'
];

angular
    .module('graphdb.framework.guides.controllers', modules)
    .controller('GuidesCtrl', GuidesCtrl);

GuidesCtrl.$inject = ['$scope'];

function GuidesCtrl($scope) {
    $scope.gudes = [];
    $scope.content = 'Test content';

    $scope.startTour = function () {
        const tour = createTour();
        // Initialize the tour
        tour.init();
        // Restart from begining
        tour.restart();
        // Start the tour
        tour.start(true);
    }



    function createTour() {
        return new Tour({
            name: "tour",
            steps: [
                {
                    element: ".title",
                    placement: 'bottom',
                    title: "Jumbotron ",
                    content: "A jumbotron indicates a big box for calling extra attention to some special content or information."
                },
                {
                    element: ".content",
                    placement: 'bottom',
                    title: "Jumbotron ",
                    content: "A jumbotron indicates a big box for calling extra attention to some special content or information."
                }
            ],
            // container: "body",
            // smartPlacement: true,
            // keyboard: true,
            // storage: window.localStorage,
            // debug: false,
            // backdrop: false,
            // backdropContainer: 'body',
            // backdropPadding: 0,
            // redirect: true,
            // orphan: false,
            // duration: false,
            // delay: false,
            // basePath: "",
            // template: "" +
            //     "<div class='popover tour'> " +
            //     "  <div class='arrow'></div> " +
            //     "  <h3 class='popover-title'></h3> " +
            //     "  <div class='popover-content'></div> " +
            //     "  <div class='popover-navigation'> " +
            //     "     <button class='btn btn-default' data-role='prev'>« Prev</button>" +
            //     "     <span data-role='separator'>|</span>" +
            //     "     <button class='btn btn-default' data-role='next'>Next »</button>" +
            //     "  </div>" +
            //     "  <button class='btn btn-default' data-role='end'>End tour</button>" +
            //     "</div>",
    // afterGetState: function (key, value) {},
    //     afterSetState: function (key, value) {},
    //     afterRemoveState: function (key, value) {},
    //     onStart: function (tour) {},
    //     onEnd: function (tour) {},
    //     onShow: function (tour) {},
    //     onShown: function (tour) {},
    //     onHide: function (tour) {},
    //     onHidden: function (tour) {},
    //     onNext: function (tour) {},
    //     onPrev: function (tour) {},
    //     onPause: function (tour, duration) {},
    //     onResume: function (tour, duration) {},
    //     onRedirectError: function (tour) {}
    });
    }
}
