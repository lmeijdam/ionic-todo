(function () {
    'use strict';

    angular
        .module('lmTodo')
        .factory('FirebaseService', FirebaseService);

    FirebaseService.$inject = ['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray', 'StorageService'];
    function FirebaseService($rootscope, $firebaseAuth, $firebaseObject, $firebaseArray, StorageService) {
        var ref = {};
        var objects = {};
        var enabled = false;
        var service = {
            initialize: initialize,
            get: get,
            add: add,
            save: save,
            remove: remove
        };
        
        return service;

        function initialize() {
            var firebaseInfo = StorageService.get("firebaseInfo");
            if (firebaseInfo) {
                var link = "https://" + firebaseInfo.source + ".firebaseio.com/";
                ref = new Firebase(link);
                objects = $firebaseArray(ref);
                enabled = true;
            } else {
                ref = {};
                objects = {};
                enabled = false;
            }
        }
        ////////////////
        function get() {
            initialize();
            if (enabled)
                return objects;
            else
                return {};
        }
        
        function add(obj) {
            objects.$add(obj);
        }
        
        function save(obj) {
            objects.$save(obj);
        }
        
        function remove(key) {
            objects.$remove(key).then(function() {
                console.log("removed");
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
})();