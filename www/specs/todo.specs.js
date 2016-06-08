describe('Todo', function () {

    var controller,
        todoServiceMock,
        stateMock,
        stateParams,
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
            todoServiceMock = {
                getAll: jasmine.createSpy('getAll').and.returnValue(deferred.promise),
                getSingleById: jasmine.createSpy('getSingleById').and.returnValue({
                    id: 123,
                    title: "test",
                    rel: "work"
                }),
                save: jasmine.createSpy('save').and.returnValue(deferred.promise),
                remove: jasmine.createSpy('remove').and.returnValue(deferred.promise)
            };

            // mock $state
            stateMock = {
                go: jasmine.createSpy('go')
            }

            // fake stateParams
            stateParams = {};

            controller = $controller('TodoController', {
                '$state': stateMock,
                '$stateParams': stateParams,
                'TodoService': todoServiceMock,
            });
        }));

    describe('Adding', function () {

        describe('when navigating to the Todo view without params', function () {

            beforeEach(inject(function (_$rootScope_) {
                scope = _$rootScope_;
                controller.activate();
            }));

            it('should have no stateParams', function () {
                expect(stateParams).toEqual({});
            });

            it('should start with an empty todoItem', function () {
                expect(controller.todoItem).toEqual({});
            });

            it('should disable saving', function () {
                expect(controller.canSave).toBe(false);
            });

            it('should hide the remove functionality', function () {
                expect(controller.canRemove).toBe(false);
            });

            it('should set the "work related" toggle to false', function () {
                expect(controller.workToggled).toBe(false);
            });
        });

        describe('when navigating to the Todo view with params', function () {

            beforeEach(inject(function (_$rootScope_) {
                scope = _$rootScope_;
                stateParams = {
                    todoId: 123
                };
                controller.activate();
            }));

            it('should have stateParams', function () {
                expect(stateParams).not.toEqual({});
            });

            it('should update the vm.todoItem', function () {
                controller.todoItem = todoServiceMock.getSingleById();
                expect(stateParams.todoId).toEqual(controller.todoItem.id);
            });            
        });

        describe('when changing the title', function () {

            it('should disable saving when the title length = 0', function () {
                controller.todoItem.title = "";
                controller.titleChanged();
                expect(controller.canSave).toBe(false);
            });

            it('should enable saving when the title length = 3', function () {
                controller.todoItem.title = "tes";
                controller.titleChanged();
                expect(controller.canSave).toBe(true);
            });

            it('should enable saving when the title length > 3', function () {
                controller.todoItem.title = "test";
                controller.titleChanged();
                expect(controller.canSave).toBe(true);
            });

            it('should disable saving when the title length < 3', function () {
                controller.todoItem.title = "te";
                controller.titleChanged();
                expect(controller.canSave).toBe(false);
            });
        });

        describe('when toggling the "work related" switch', function () {
            // bound to a ng-model/property on controller. not really testable.

            it('should be set on false', function () {
                controller.workToggled = false;
                expect(controller.workToggled).toBe(false);
            });

            it('should be set on true', function () {
                controller.workToggled = true;
                expect(controller.workToggled).toBe(true);
            });
        });

        describe('when saving the todo', function () {

            it('should not call the TodoService.save function if empty', function () {
                controller.todoItem = {};
                controller.saveTodo();
                expect(todoServiceMock.save).not.toHaveBeenCalled();

            });

            it('should call the TodoService.save function if set', function () {
                controller.todoItem.title = "test";
                controller.titleChanged();
                controller.saveTodo();
                expect(todoServiceMock.save).toHaveBeenCalled();
            });

            it('should set rel to "work" if workToggled is true', function () {
                controller.todoItem.title = "test";
                controller.titleChanged();
                controller.workToggled = true;
                controller.saveTodo();
                expect(controller.todoItem.rel).toBe('work');
            });

            it('should set rel to "private" if workToggled is false', function () {
                controller.todoItem.title = "test";
                controller.titleChanged();
                controller.workToggled = false;
                controller.saveTodo();
                expect(controller.todoItem.rel).toBe('private');
            });

            it('should change state to "app.home" if saving succeeds', function () {
                controller.todoItem.title = "test";
                controller.titleChanged();
                controller.saveTodo();

                expect(todoServiceMock.save).toHaveBeenCalled();

                deferred.resolve(null);
                scope.$digest();

                expect(stateMock.go).toHaveBeenCalledWith('app.home');

            });


        });
    });
});