(function () {
    'use strict';

    angular.module('lmTodo')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'js/app/menu/menu.template.html',
                    controller: 'MenuController',
                    controllerAs: 'menu'
                })

                .state('app.home', {
                    url: '/home',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/app/home/home.template.html',
                            controller: 'HomeController',
                            controllerAs: 'home'
                        }
                    }
                })

                .state('app.settings', {
                    url: '/settings',
                    views: {
                        'menuContent': {
                            templateUrl: 'js/app/settings/settings.template.html',
                            controller: 'SettingsController',
                            controllerAs: 'settings'
                        }
                    }
                })

                .state('app.details', {
                    url: '/todo',                    
                    params: {todoId: null},
                    views: {
                        'menuContent': {
                            templateUrl: 'js/app/todo/todo.template.html',
                            controller: 'TodoController',
                            controllerAs: 'todo',
                        }
                    }
                })

                .state('app.add', {
                    url: '/todo',           
                    views: {
                        'menuContent': {
                            templateUrl: 'js/app/todo/todo.template.html',
                            controller: 'TodoController',
                            controllerAs: 'todo',
                        }
                    }
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });
})();