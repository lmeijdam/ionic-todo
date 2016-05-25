(function () {
    'use strict';

    angular
        .module('lmTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q', 'UtilitiesService', 'StorageService'];
    function TodoService($q, UtilitiesService, StorageService) {
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
            var storedList = StorageService.get("list");
            if (storedList) {
                todoList = storedList;
            }
            return $q.when(todoList);
        }

        function getSingleById(id) {
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === id) return todoList[i];
            }
        }

        function getIndexById(id) {
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === id) return i;
            }
        }

        // saving
        function save(todo) {
            if (!todo.id) {
                var uid = UtilitiesService.createGuid();
                todo.id = uid;
                todoList.push(todo);
            }
            
            StorageService.set("list", todoList);
            return $q.when(todoList);
        }
        
        // deletion
        function remove(todo) {
            var index = getIndexById(todo.id);
            if (index > -1) {
                todoList.splice(index, 1);
            }

            StorageService.set("list", todoList);
            return $q.when(todoList);
        }
    }

})();