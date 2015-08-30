module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'public/dependencies/angular-1.2.9/angular.js',
            'public/dependencies/angular-mocks/angular-mocks.js',
            'public/dependencies/angular-bootstrap/ui-bootstrap.js',
            'public/dependencies/angular-ui-notification-0.0.5/angular-ui-notification.min.js',
            'public/js/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
        ]
    });
};