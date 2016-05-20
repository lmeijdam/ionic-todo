(function() {
'use strict';

    angular
        .module('lmTodo')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();