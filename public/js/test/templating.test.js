describe('Templating', function () {
    beforeEach(module('app'));

    var templating, $rootScope;

    beforeEach(inject(function (_$rootScope_, _Templating_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        templating = _Templating_;
        $rootScope = _$rootScope_
    }));

    describe('$scope.grade', function () {
        it('templates a string', function () {
            var values = {
                me: {
                    id: 1,
                    name: "Thomion"
                },
                character: {
                    id: 2,
                    name: "Josef"
                }
            }
            var mail;
            templating.render('joinQueue', values)
                .then(function (mail) {
                    console.log(mail);

                })
                .catch(function () {
                    console.error("FAIL")
                })

            $rootScope.$digest();
            expect(mail).toEqual("bla");
        });
    });
});