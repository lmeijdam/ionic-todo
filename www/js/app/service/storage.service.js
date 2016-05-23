(function() {
'use strict';

    angular
        .module('lmTodo')
        .factory('StorageService', StorageService);

    StorageService.$inject = ['$localStorage'];
    function StorageService($localStorage) {
        var service = {
            get:get,
            set:set,
            remove:remove
        };
        
        return service;

        ////////////////
        function get(key){
            return $localStorage.key;
        }
              
        function set(key, value){
            $localStorage.key = value;
        }    
        
        function remove(key){
            delete $localStorage.key;
        }       
    }
})();