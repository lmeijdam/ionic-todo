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
            getIndexById: getIndexById,
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