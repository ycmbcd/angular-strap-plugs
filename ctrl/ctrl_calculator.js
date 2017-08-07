define(['app'], function(app){ 
    app.controller('calculatorCtrl', ['$scope','$log','myService', function($scope,$log,myService){

        $scope.type = 'active';
        $scope.operator = '1';
        $scope.num1 = 0;
        $scope.num2 = 0;
        $scope.result = 0;

        $scope.calculate = function() {
            $scope.result = myService.getResult(Number($scope.num1), Number($scope.num2), $scope.operator);
        };

        var activeModeListen;

        $scope.$watch('type', function(newType) {
                if(newType == 'active') { //自动计算
                    $('#bResult').attr('disabled', 'true');
                    activeModeListen = $scope.$watchGroup(['num1', 'num2', 'operator'], function() {
                            $scope.result = myService.getResult(Number($scope.num1), Number($scope.num2), $scope.operator);
                        }
                    );
                }
                else if(newType == 'static') { //需要按等号
                    activeModeListen();
                    $('#bResult').removeAttr('disabled');
                }
            }
        );


    }]);

    app.factory('myFactory', function() {
        var func = {};

        func.add = function(a, b) {
            if(a.toString().indexOf('.') != -1
                && b.toString().indexOf('.') != -1) {
                    var sq1,sq2,m;
                    try {
                        sq1 = a.toString().split(".")[1].length;
                    }
                    catch (e) {
                        sq1 = 0;
                    }
                    try {
                        sq2 = b.toString().split(".")[1].length;
                    }
                    catch (e) {
                        sq2 = 0;
                    }
                    m = Math.pow(10,Math.max(sq1, sq2));
                    return (a * m + b * m) / m;
                }
                else {
                    return a + b;
                }
        };

        func.minus = function(a, b) {
            if(a.toString().indexOf('.') != -1
                && b.toString().indexOf('.') != -1) {
                    var sq1,sq2,m;
                    try {
                        sq1 = a.toString().split(".")[1].length;
                    }
                    catch (e) {
                        sq1 = 0;
                    }
                    try {
                        sq2 = b.toString().split(".")[1].length;
                    }
                    catch (e) {
                        sq2 = 0;
                    }
                    m = Math.pow(10,Math.max(sq1, sq2));
                    return (a * m + b * m) / m;
                }
                else {
                    return a - b;
                }
        };

        func.multiply = function(a, b) {
            return a * b;
        };

        func.divided = function(a, b) {
            return a / b;
        };

        return func;//将声明的func对象返回
    })

    app.service('myService', function(myFactory) {
        this.getResult = function(m, n, operator) {
            var regExp = /[0-9]+/;
            if(!regExp.test(m) || !regExp.test(n)) {
                alert('must input number instead of others type of variable')
            }
            else {
                if(operator === '1') {
                    return myFactory.add(m, n);
                }

                else if(operator === '2') {
                    return myFactory.minus(m, n);
                }

                else if(operator === '3') {
                    return myFactory.multiply(m, n);
                }

                else if(operator === '4') {
                    return myFactory.divided(m, n);
                }
            }
        };
    })

    return app;
});