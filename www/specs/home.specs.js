describe('HomeController', function () {

    var controller,
        todoServiceMock,
        stateMock,
        ionicPopupMock,
        scope,
        deferred;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));

    // instantiate the controller and mocks for every test
    beforeEach(inject(function ($rootScope, $controller, $injector, $q) {
        scope = $rootScope.$new();
        deferred = $q.defer();
        todoServiceMock = {
            getAll: jasmine.createSpy('getAll').and.returnValue(deferred.promise)
        };
        //deferredLogin = $q.defer();

        // mock dinnerService
        // dinnerServiceMock = {
        // 	login: jasmine.createSpy('login spy')
        // 				  .and.returnValue(deferredLogin.promise)			
        // };

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        //ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);       

        // instantiate LoginController
        // controller = $controller('HomeController', { 
        // 				'$ionicPopup': ionicPopupMock, 
        // 				'$state': stateMock, 
        // 				'DinnerService': dinnerServiceMock }
        // 			 );
        controller = $controller('HomeController', {
            'TodoService': todoServiceMock,
            '$state': stateMock
        });
    }));
    // requirements
    /*
        1. getting a list of todo's
        3. tapping the add button will go to state add
        2. tapping a todo will go to state details with a parameter
    */

    describe('when activating the homeview', function () {

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_;
            controller.activate();
        }));

        it('should start with an empty list', function () {
            expect(controller.todoList.length).toBe(0);
        });

        it('should call the getAll function', function () {
            expect(todoServiceMock.getAll).toHaveBeenCalled();
        });

        it('should fill the list if the promise gets resolved', function () {
            deferred.resolve([1, 2, 3]); // we resolve it with 3 values
            scope.$digest();
            expect(controller.todoList.length).toBe(3);
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


    // 	// call doLogin on the controller for every test
    // 	beforeEach(inject(function(_$rootScope_) {
    // 		$rootScope = _$rootScope_;
    // 		controller.username = 'test1';
    // 		controller.password = 'password1';
    // 		controller.doLogin();
    // 	}));

    // 	it('should call login on dinnerService', function() {
    // 		expect(dinnerServiceMock.login).toHaveBeenCalledWith('test1', 'password1');	
    // 	});

    //     describe('when the login is executed,', function() {
    // 		it('if successful, should change state to my-dinners', function() {

    // 			deferredLogin.resolve();
    // 			$rootScope.$digest();

    // 			expect(stateMock.go).toHaveBeenCalledWith('my-dinners');
    // 		});

    // 		it('if unsuccessful, should show a popup', function() {

    // 			deferredLogin.reject();
    // 			$rootScope.$digest();

    // 			expect(ionicPopupMock.alert).toHaveBeenCalled();
    // 		});
    // 	});
});