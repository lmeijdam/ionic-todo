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
        vm.markDone = markDone;

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
        
        function markDone(todo){
            TodoService.remove(todo).then(function(data){
                if(!data) return;
                vm.todoList = data;
            });
        }
    }
})();