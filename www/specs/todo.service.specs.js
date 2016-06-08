describe('TodoService', function () {

    var todoService,
        storageServiceMock,
        firebaseServiceMock,
        utilitiesServiceMock;

    // load the module for our app
    beforeEach(module('lmTodo', function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();

    }));

    beforeEach(module(function ($provide) {
        storageServiceMock = {
            get: function (key) { },
            set: function (key, value) { },
            remove: function (key) { }
        };
        
        firebaseServiceMock = {
            initialize: function () { },
            get: function () { },
            add: function (key) { },
            save: function (key) { },
            remove: function (key) { }
        }

        utilitiesServiceMock = {
            createGuid: function () { }
        };

        $provide.value('StorageService', storageServiceMock);
        $provide.value('UtilitiesService', utilitiesServiceMock);
        $provide.value('FirebaseService', firebaseServiceMock);
    }));

    beforeEach(inject(function ($rootScope, $injector, $q) {
        scope = $rootScope.$new();
        todoService = $injector.get('TodoService');
    }));

    describe('when calling getAll', function () {
        it('should call the firebaseServiceMock.get function', function () {
            spyOn(firebaseServiceMock, 'get');
            todoService.getAll();
            expect(firebaseServiceMock.get).toHaveBeenCalled();
        });

    });

    describe('when saving', function () {

        it('should call the firebaseServiceMock.add function', function () {
            spyOn(firebaseServiceMock, 'add');
            todoService.save({});
            expect(firebaseServiceMock.add).toHaveBeenCalled();
        });

    });

    describe('when removing a todo', function () {

        it('should call the firebaseServiceMock.remove function', function () {
            spyOn(firebaseServiceMock, 'remove');
            todoService.remove({});
            expect(firebaseServiceMock.remove).toHaveBeenCalled();
        });

    }); 
});