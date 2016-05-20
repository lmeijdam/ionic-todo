describe('HomeController', function () {

    var controller,
        deferredLogin,
        dinnerServiceMock,
        stateMock,
        ionicPopupMock,
        scope;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();
    }));

    // instantiate the controller and mocks for every test
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        //deferredLogin = $q.defer();

        // mock dinnerService
        // dinnerServiceMock = {
        // 	login: jasmine.createSpy('login spy')
        // 				  .and.returnValue(deferredLogin.promise)			
        // };

        // mock $state
        //stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        //ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);       

        // instantiate LoginController
        // controller = $controller('HomeController', { 
        // 				'$ionicPopup': ionicPopupMock, 
        // 				'$state': stateMock, 
        // 				'DinnerService': dinnerServiceMock }
        // 			 );
        controller = $controller('HomeController', {});
        console.log(controller);
    }));


    describe('when calling the testFunction', function () {

        it('should call the testFunction', function () {
            expect(controller.testFunction()).toBe("Called");
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