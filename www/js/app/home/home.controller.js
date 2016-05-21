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
                vm.todoList = data;
            });
        }
        
        function openTodo(item){         
            console.log(item);               
            $state.go('app.details' ,{ todoId: item.id });
        }
    }
})();