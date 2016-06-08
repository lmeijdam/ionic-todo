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
        vm.removeTodo = removeTodo;
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

        function removeTodo() {
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