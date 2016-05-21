(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = [];
    function SettingsController() {
        var vm = this;

        activate();
        function activate() {
            // this is the activate function
        }
    }
})();