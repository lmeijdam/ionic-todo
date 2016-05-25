describe('StorageService', function () {

    var storageService, localStorageMock;

    // load the module for our app
    beforeEach(module('lmTodo'));
    
    beforeEach(module(function ($provide) {
        localStorageMock = {};   
        $provide.value('$localStorage', localStorageMock);
    }));

    beforeEach(inject(function ($rootScope, $injector, $q) {
        scope = $rootScope.$new();
        storageService = $injector.get('StorageService');
    }));

    describe('when storing value', function () {

        it('should update the localStorage', function () {
            storageService.set("val", 4);
            expect(localStorageMock["val"]).toBe(4);
        });
    });

    describe('when retrieving stored value', function () {

        it('should get the value from the localStorage', function () {
            storageService.set("val", 4);
            expect(storageService.get("val")).toBe(4);
        });
    });

    describe('when deleting stored value', function () {

        it('should delete the item from the localStorage', function () {
            storageService.set("val", 4);
            storageService.remove("val");
            expect(storageService.get("val")).toBe(undefined);
        });
    });

});