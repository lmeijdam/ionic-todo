(function () {
  'use strict';

  angular.module('lmTodo', [
    'ionic',
    'ngStorage',
    'firebase'
  ]).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

})();
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
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'TodoService']; //
    function HomeController($scope, $state, TodoService) { //
        var vm = this;
        vm.todoList = [];
        
        vm.openTodo = openTodo;
        vm.markDone = markDone;

        activate();

        // update after updating or navigating
        // $scope.$on('$stateChangeSuccess',
        //     function onStateSuccess(event, toState, toParams, fromState) {
        //         activate();
        //     }
        // );
 
        function activate() {
            vm.todoList = [];
            TodoService.getAll().then(function (data) {
                if (!data) return;
                
                vm.todoList = data;
            });
        } 

        function openTodo(item) {
            if (item)
                $state.go('app.details', { todoId: item.id });
            else 
                $state.go('app.add');
        }

        function markDone(todo) {
            TodoService.remove(todo).then(function (data) {
                if (!data) return;
                vm.todoList = data;
            });
        } 
    }
})();
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('MenuController', MenuController);

    MenuController.$inject = [];
    function MenuController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // this is the activate function
        } 
    }
})(); 
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .factory('FirebaseService', FirebaseService);

    FirebaseService.$inject = ['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'StorageService'];
    function FirebaseService($rootscope, $firebaseAuth, $firebaseObject, $firebaseArray, StorageService) {
        var ref = {};
        var objects = {};
        var enabled = false;
        var service = {
            initialize: initialize,
            get: get,
            add: add,
            save: save,
            remove: remove
        };
        
        return service;

        function initialize() {
            var firebaseInfo = StorageService.get("firebaseInfo");
            if (firebaseInfo) {
                var link = "https://" + firebaseInfo.source + ".firebaseio.com/";
                ref = new Firebase(link);
                objects = $firebaseArray(ref);
                enabled = true;
            } else {
                ref = {};
                objects = {};
                enabled = false;
            }
        }
        ////////////////
        function get() {
            initialize();
            if (enabled)
                return objects;
            else
                return {};
        }
        
        function add(obj) {
            objects.$add(obj);
        }
        
        function save(obj) {
            objects.$save(obj);
        }
        
        function remove(key) {
            objects.$remove(key).then(function() {
                console.log("removed");
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
})();
(function() {
'use strict';

    angular
        .module('lmTodo')
        .factory('StorageService', StorageService);

    StorageService.$inject = ['$localStorage'];
    function StorageService($localStorage) {
        var service = {
            get:get,
            set:set,
            remove:remove
        };
        
        return service;

        ////////////////
        function get(key){
            return $localStorage[key];
        }
              
        function set(key, value){
            $localStorage[key] = value;
        }    
        
        function remove(key){
            delete $localStorage[key];
        }       
    }
})();
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q', 'UtilitiesService', 'StorageService', 'FirebaseService'];
    function TodoService($q, UtilitiesService, StorageService, FirebaseService) {
        var service = {
            getAll: getAll,
            getSingleById: getSingleById,
            save: save,
            remove: remove
        };

        var todoList = [];
        return service;

        // retrieving
        function getAll() {
            var firebaseResult = FirebaseService.get();
            if (firebaseResult !== null) { // from service
                todoList = firebaseResult;
            } 
            
            return $q.when(todoList);
        }
        
        function getSingleById(id) {
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === id) 
                    return todoList[i];
            }
        }

        function getIndexById(id) {
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === id) 
                    return i;
            }
        }

        // adding/saving
        function save(todo) {
            if (!todo.id) {
                todo.id = UtilitiesService.createGuid();                
                FirebaseService.add(todo);
            } else {
                FirebaseService.save(todo);
            }

            return $q.when(todoList);
        }

        // removing
        function remove(todo) {
            var index = getIndexById(todo.id);  
            FirebaseService.remove(index);
            
            return $q.when(todoList);
        }
    }

})();
(function() {
'use strict';

    angular
        .module('lmTodo')
        .factory('UtilitiesService', UtilitiesService);

    UtilitiesService.$inject = [];
    function UtilitiesService() {
        var service = {
            createGuid:createGuid
        };
        
        return service;

        function createGuid(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4();
        }       
    }
})();
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['StorageService'];
    function SettingsController(StorageService) {
        var vm = this;
        vm.firebaseToggled = false;
        vm.firebaseObj = {};           

        vm.save = save;

        activate();
        function activate() {
            var result = StorageService.get("firebaseInfo");
            if (result) {
                vm.firebaseObj = result;
                vm.firebaseToggled = true;
            }
        }

        function save() {
            if (vm.firebaseToggled) {
                vm.firebaseObj.firebaseEnabled = vm.firebaseToggled;
                StorageService.set("firebaseInfo", vm.firebaseObj);
            } else {
                StorageService.remove("firebaseInfo");
            }
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$state', '$stateParams', 'TodoService', '$timeout'];
    function TodoController($state, $stateParams, TodoService, $timeout) {
        var vm = this;
        vm.todoItem = {};
        vm.saveTodo = saveTodo;
        vm.deleteTodo = deleteTodo;
        vm.titleChanged = titleChanged;
        vm.activate = activate;

        vm.workToggled = false;
        vm.canRemove = false;
        vm.canSave = false;

        activate();

        function activate() {
            if ($stateParams.todoId) {
                vm.todoItem = TodoService.getSingleById($stateParams.todoId);
                if(vm.todoItem.id !== $stateParams.todoId) return;
                vm.workToggled = vm.todoItem.rel === 'work';
                vm.canRemove = true;
                titleChanged();
            }
        }

        function saveTodo() {
            if(!vm.canSave || !vm.todoItem.title) return;

            vm.todoItem.rel = (vm.workToggled) ? "work" : "private";
            TodoService.save(vm.todoItem).then(function () {
                $state.go("app.home");
            });
        }

        function deleteTodo() {
            if (!vm.canRemove || !vm.todoItem.id) return; // id gets defined when item is saved

            TodoService.remove(vm.todoItem).then(function () {
                $state.go("app.home");
            });
        }

        function titleChanged() {
            vm.canSave = vm.todoItem.title.length >= 3;
        }
    }
})();