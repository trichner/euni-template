app.controller('AccountDetailsCtrl',function ($scope,$http,$location,$interval,$document,$window,$q,API,EveIGB,Notification,EveIMG,EveLinky,Templating) {

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

    var templates = ['joinQueue.json','afkQueue.json'];

    function setPath(obj,path,value){
        path = path.split('.');
        if(path.length==0){
            return;
        }
        var node = obj;
        var branch = path.shift();
        while(path.length>0){
            node[branch] = node[branch] || {};
            node = node[branch];
            branch = path.shift();
        }
        node[branch] = value;
        return obj;
    }

    $scope.render = function(){
        var template = $scope.selectedTemplate;
        var context = {};
        template.values.forEach(function (value) {
            setPath(context,value.path,value.input)
        })
        console.log(JSON.stringify(context));
        Templating.render(template.template,context)
            .then(function (rendered) {
                $scope.template = rendered;
            })
    }

    $q.all(templates.map(function (template) {
        return Templating.load(template)
    })).then(function (templates) {
        $scope.templates = templates;
        $scope.selectedTemplate = $scope.templates[0];
        $scope.$digest();
    })

    API.getMe()
        .then(function (res) {
            $scope.me = res.data;
            $scope.authenticated = true;
            console.log('Welcome ' + $scope.me.name + '!');
        })
});