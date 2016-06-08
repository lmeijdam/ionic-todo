describe('Settings', function () {

    var controller,
        storageServiceMock,
        stateMock,
        scope,
        deferred;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));

    beforeEach(inject(function ($rootScope, $controller, $injector, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        storageServiceMock = {
            get: jasmine.createSpy('get').and.returnValue("stored"),
            set: jasmine.createSpy('set'),
            remove: jasmine.createSpy('remove')
        };

        // fake stateParams
        stateParams = {};

        controller = $controller('SettingsController', {
            'StorageService': storageServiceMock
        });
    }));

    describe('When activating', function () {
        it('should call the storageServiceMock.get function', function () {
            expect(storageServiceMock.get).toHaveBeenCalled();
        });

        it('should call the storageServiceMock.get function with firebaseInfo', function () {
            expect(storageServiceMock.get).toHaveBeenCalledWith("firebaseInfo");
        });

        it('should set the controller.firebaseObject to "stored"', function () {
            expect(controller.firebaseObj).toBe("stored");
        });
        it('should enable firebase', function () {
            expect(controller.firebaseToggled).toBe(true);
        });
    });

    describe('When saving', function () {
        it('should call the storageServiceMock.set function', function () {
            controller.firebaseObj = {};
            controller.save();
            expect(storageServiceMock.set).toHaveBeenCalled();
        });
        
        it('should call the storageServiceMock.remove function if disabled', function () {
            controller.firebaseToggled = false;
            controller.firebaseObj = {};
            controller.save();
            expect(storageServiceMock.remove).toHaveBeenCalled();
        });

        
    });


});