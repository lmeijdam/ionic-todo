(function () {
    'use strict';

    angular
        .module('lmTodo')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['StorageService'];
    function SettingsController(StorageService) {
        var vm = this;
        vm.firebaseToggled = false;
        vm.firebaseObj = {};           

        vm.save = save;

        activate();
        function activate() {
            var result = StorageService.get("firebaseInfo");
            if (result) {
                vm.firebaseObj = result;
                vm.firebaseToggled = true;
            }
        }

        function save() {
            if (vm.firebaseToggled) {
                vm.firebaseObj.firebaseEnabled = vm.firebaseToggled;
                StorageService.set("firebaseInfo", vm.firebaseObj);
            } else {
                StorageService.remove("firebaseInfo");
            }
        }
    }
})();