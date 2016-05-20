(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];
    function HomeController() {
        var vm = this;
        vm.testFunction = testFunction;

        activate();

        ////////////////

        function activate() {
            // this is the activate function
        }

        function testFunction() {
            return "Called";
        }
    }
})();