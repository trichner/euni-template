app.controller('AccountDetailsCtrl', function ($scope, $http, $location, $interval, $document, $window, $q, objectPath, API, EveIGB, Notification, EveIMG, EveLinky, Templating, Minions) {

    $scope.me = null;
    $scope.authenticated = false;

    $scope.isIGB = EveIGB.isIGB();
    EveIGB.requestTrust($location.protocol + "//" + $location.host + "/*");
    console.log('You are' + ($scope.isIGB ? '' : ' not') + ' in Eve IGB')

    $scope.window = $window;

    $scope.eveimg = EveIMG;
    $scope.eveigb = EveIGB;

    $scope.templates = [];
    $scope.selectedTemplate = {};

    $scope.inputChanged = function () {
        renderSelected();
    }

    function renderSelected() {

        var template = $scope.selectedTemplate;
        var context = {};
        template.values.forEach(function (value) {
            objectPath.set(context,value.path, value.input);
        })

        console.log(JSON.stringify(context));
        Templating.render(template, context)
            .then(function (rendered) {
                $scope.template = rendered;
            })

    }

    $scope.render = renderSelected;

    API.getTemplates()
        .then(function (res) {
            $scope.templates = res.data;
            $scope.selectedTemplate = $scope.templates[0];
            $scope.$digest();
        });

    API.getMe()
        .then(function (res) {
            $scope.me = res.data;
            $scope.authenticated = true;
            console.log('Welcome ' + $scope.me.name + '!');
        })
});