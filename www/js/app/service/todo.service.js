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