(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('TodoDetailsController', TodoDetailsController);

    TodoDetailsController.$inject = ['$state', '$stateParams', 'TodoService'];
    function TodoDetailsController($state, $stateParams, TodoService) {
        var vm = this;
        vm.todoItem = null;

        activate();
        function activate() {
            vm.todoItem = TodoService.getSingleById($stateParams.todoId);
        }
    }
})();