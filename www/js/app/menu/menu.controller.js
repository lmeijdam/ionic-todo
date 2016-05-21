(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('MenuController', MenuController);

    MenuController.$inject = [];
    function MenuController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // this is the activate function
        }
    }
})();