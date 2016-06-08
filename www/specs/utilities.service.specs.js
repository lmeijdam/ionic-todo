describe('UtilitiesService', function () {

    var utilitiesService;

    // load the module for our app
    beforeEach(module('lmTodo'));

    // disable template caching
    beforeEach(module(function ($provide, $urlRouterProvider) {
        $provide.value('$ionicTemplateCache', function () { });
        $urlRouterProvider.deferIntercept();

    }));

    beforeEach(inject(function ($rootScope, $injector, $q) {
        scope = $rootScope.$new();
        utilitiesService = $injector.get('UtilitiesService');
    }));
    
    
    describe('Initialization', function() {
        
        it('should assign the utilitiesService', function() {
            expect(utilitiesService).not.toBeUndefined();               
        });
            
    });        

    describe('when calling createGuid', function () {

        it('should call the createGuid function', function () {
            spyOn(utilitiesService, 'createGuid');
            utilitiesService.createGuid();
            expect(utilitiesService.createGuid).toHaveBeenCalled();
        });

        it('should return a value', function () {
            var result = utilitiesService.createGuid();
            expect(result).not.toBe(null);
        });

    });

});