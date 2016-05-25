describe('TodoService', function () {

    var todoService,
        storageServiceMock,
        utilitiesServiceMock;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();

    }));

    beforeEach(module(function ($provide) {
        storageServiceMock = {
            get: function (key) { },
            set: function (key, value) { },
            remove: function (key) { }
        };

        utilitiesServiceMock = {
            createGuid: function () { }
        };

        $provide.value('StorageService', storageServiceMock);
        $provide.value('UtilitiesService', utilitiesServiceMock);
    }));

    beforeEach(inject(function ($rootScope, $injector, $q) {
        scope = $rootScope.$new();
        todoService = $injector.get('TodoService');
    }));

    describe('when calling getAll', function () {

        it('should call the storageService.get function', function () {
            spyOn(storageServiceMock, 'get');
            todoService.getAll();
            expect(storageServiceMock.get).toHaveBeenCalledWith('list');
        });

    });

    describe('when saving', function () {

        it('should call the storageService.set function', function () {
            spyOn(storageServiceMock, 'set');
            todoService.save({});
            expect(storageServiceMock.set).toHaveBeenCalled();
        });

    });

    describe('when removing a todo', function () {

        it('should call the storageService.set function', function () {
            spyOn(storageServiceMock, 'set');
            todoService.remove({});
            expect(storageServiceMock.set).toHaveBeenCalled();
        });

    });
});