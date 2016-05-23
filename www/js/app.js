(function () {
  'use strict';

  angular.module('lmTodo', [
    'ionic',
    'ngStorage'
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

    HomeController.$inject = ['$state', 'TodoService'];
    function HomeController($state, TodoService) {
        var vm = this;
        vm.todoList = [];
        
        vm.activate = activate;
        vm.openTodo = openTodo;

        activate();
        
        function activate() {
            TodoService.getAll().then(function(data){
                if(!data) return;
                vm.todoList = data;
            });
        }
        
        function openTodo(item){     
            if(item){                
                $state.go('app.details' ,{ todoId: item.id });
            }
            else {                
                $state.go('app.add');
            }
                      
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

        function activate() {
            // this is the activate function
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
            return $localStorage.key;
        }
              
        function set(key, value){
            $localStorage.key = value;
        }    
        
        function remove(key){
            delete $localStorage.key;
        }       
    }
})();
(function() {
'use strict';

    angular
        .module('lmTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q', 'UtilitiesService', 'StorageService'];
    function TodoService($q, UtilitiesService, StorageService) {
        var service = {
            getAll:getAll,
            getSingleById:getSingleById,
            save:save,
            remove:remove
        };
        
        var todoList = [];
        
        return service;

        // retrieving
        function getAll() { 
            return $q.when(getAllTodos());
        }
        
        function getAllTodos(){
            var storedList = StorageService.get("list");            
            if(storedList) {
                todoList = storedList;
            }
            return todoList;
        }
        
        function getSingleById(id){
            for(var i = 0; i < todoList.length; i++){
                if(todoList[i].id === id) return todoList[i];
            }
        }
        
        function getIndexById(id){
            for(var i = 0; i < todoList.length; i++){
                if(todoList[i].id === id) return i;
            }
        }
        
        // saving
        function save(todo){            
            if(todo.id){
                return $q.when(updateTodo(todo));
            }            
            return $q.when(saveTodo(todo));
        }
        
        function saveTodo(todo){
            var uid = UtilitiesService.createGuid();
            todo.id = uid;
            
            todoList.push(todo);
            
            StorageService.set("list", todoList);
        }
        
        function updateTodo(todo){
            var localTodo = getSingleById(todo.id);
            localTodo.title = todo.title;            
            
            StorageService.set("list", todoList);
        }     
        
        // deletion
        function remove(todo) {
            return $q.when(removeTodo(todo));
        }
        
        function removeTodo(todo) {
            var index = getIndexById(todo.id);
            if(index > -1){
                todoList.splice(index, 1);
            }            
            
            StorageService.set("list", todoList);
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

        ////////////////
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

    SettingsController.$inject = [];
    function SettingsController() {
        var vm = this;

        activate();
        function activate() {
            // this is the activate function
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

        vm.workToggled = false;
        vm.canRemove = false;
        vm.canSave = false;

        activate();

        function activate() {
            if ($stateParams.todoId) {
                vm.todoItem = TodoService.getSingleById($stateParams.todoId);
                vm.workToggled = vm.todoItem.rel === 'work';
                vm.canRemove = true;
                titleChanged();
            }
        }

        function saveTodo() {
            if (!vm.todoItem.title) return;

            vm.todoItem.rel = (vm.workToggled) ? "work" : "private";
            TodoService.save(vm.todoItem).then(function () {
                $state.transitionTo("app.home");
            });
        }

        function deleteTodo() {
            console.log(vm.todoItem);
            if (!vm.todoItem.id) return; // is not yet saved

            TodoService.remove(vm.todoItem).then(function () {
                $state.transitionTo("app.home");
            });
        }

        function titleChanged() {
            console.log("Title Changed");
            $timeout(function () {
                vm.canSave = vm.todoItem.title.length >= 3;
                console.log(vm.canSave);
            }, 0);
        }
    }
})();