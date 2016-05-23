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