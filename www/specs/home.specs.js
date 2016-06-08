describe('Home', function () {

    var controller,
        rootscope,
        todoServiceMock,
        stateMock,
        ionicPopupMock,
        scope,
        deferred;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    // THIS IS VERY IMPORTANT WHEN USING $Q
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept(); // << KILLER LINE
    }));
    
    beforeEach(inject(function ($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        deferred = $q.defer();

        todoServiceMock = {
            getAll: jasmine.createSpy('getAll').and.returnValue(deferred.promise),
            remove: jasmine.createSpy('remove').and.returnValue(deferred.promise)
        };

        stateMock = jasmine.createSpyObj('$state spy', ['go']);
        controller = $controller('HomeController', {
            '$scope': scope,
            '$state': stateMock,
            'TodoService': todoServiceMock
        });
    }));

    // instantiate the controller and mocks for every test
    // it('should simulate promise', inject(function ($q, $rootScope) {
    //     var deferred = $q.defer();
    //     var promise = deferred.promise;
    //     var resolvedValue;

    //     promise.then(function (value) { resolvedValue = value; });
    //     expect(resolvedValue).toBeUndefined();

    //     // Simulate resolving of promise
    //     deferred.resolve(123);
    //     // Note that the 'then' function does not get called synchronously.
    //     // This is because we want the promise API to always be async, whether or not
    //     // it got called synchronously or asynchronously.
    //     expect(resolvedValue).toBeUndefined();

    //     // Propagate promise resolution to 'then' functions using $apply().
    //     $rootScope.$digest();
    //     expect(resolvedValue).toEqual(123);
    // }));

    describe('when activating the homeview', function () {
        it('should start with an empty list', function () {
            expect(controller.todoList.length).toBe(0);
        });

        it('should call the getAll function', function () {
            expect(todoServiceMock.getAll).toHaveBeenCalled();
        });

        it('should fill the list if the todoServiceMock.getAll() gets resolved', function () {
            deferred.resolve([1, 1, 1, 1, 1, 2, 3]); // we resolve it with 3 values
            rootScope.$digest(); // can also be $apply();
            expect(controller.todoList.length).toEqual(7);
        });

        it('should NOT fill the list if the todoServiceMock.getAll() gets resolved with null', function () {
            deferred.resolve(null); // we resolve it with 3 values
            scope.$digest();
            expect(controller.todoList.length).toBe(0);
        });

    });

    describe('when tapping a todo', function () {
        it('should change the state to app.details', function () {
            controller.openTodo(fakeTodo);
            expect(stateMock.go).toHaveBeenCalled();
        });

    });

    describe('when tapping the + button', function () {
        it('should change the state to app.add', function () {
            controller.openTodo(null);
            expect(stateMock.go).toHaveBeenCalledWith('app.add');
        });

    });

    describe('when marking a todo as "Done"', function () {

        it('should call the remove function', function () {
            controller.markDone(fakeTodo);
            expect(todoServiceMock.remove).toHaveBeenCalled();
        });
        // WHY ? error: .remove(...).when is not a function ... TYPO then/when

        it('should fill the list if the todoServiceMock.remove() gets resolved', function () {
            controller.markDone(fakeTodo);
            deferred.resolve([1, 2, 3]); // we resolve it with 3 values
            scope.$digest();
            expect(controller.todoList.length).toBe(3);
        });

        it('should leave the list when remove will return null', function () {
            controller.markDone(fakeTodo);
            deferred.resolve(null); // we resolve it with 3 values
            scope.$digest();
            expect(controller.todoList.length).toBe(0);
        });

    });
});