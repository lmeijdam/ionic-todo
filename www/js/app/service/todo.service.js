(function() {
'use strict';

    angular
        .module('lmTodo')
        .factory('TodoService', TodoService);

    TodoService.$inject = ['$q'];
    function TodoService($q) {
        var service = {
            getAll:getAll,
            getSingleById:getSingleById
        };
        
        var todoList = [{
            id: 5,
            title: "First"
        },{            
            id: 6,
            title: "Second"
        },{            
            id: 7,
            title: "Third"
        },{            
            id: 8,
            title: "Do"
        },{            
            id: 9,
            title: "Something"
        },{            
            id: 10,
            title: "Smartass"
        },{            
            id: 11,
            title: "haha"
        },{            
            id: 12,
            title: "okay"
        }];
        
        return service;

        ////////////////
        function getAll() { 
            return $q.when(todoList);
        }
        
        function getSingleById(id){
            for(var i = 0; i < todoList.length; i++){
                if(todoList[i].id === id) return todoList[i];
            }
        }
    }
    
})();