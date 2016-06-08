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