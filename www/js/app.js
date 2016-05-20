(function () {  
  'use strict';

  angular.module('lmTodo', [
    'ionic'
  ]).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
  
})();
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