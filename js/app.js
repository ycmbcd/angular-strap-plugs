define(['angular'], function (angular) {

    var myApp = angular.module('myApp', ['ui.router','ngAnimate','mgcrea.ngStrap','ngSanitize','ngFlatDatepicker','ngFileUpload','ionic']);

    // 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
    myApp.run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // 跳转开始
        $rootScope.$on('$stateChangeStart',function(){ 
            document.getElementById('info1').innerHTML='等待响应';
            document.getElementById('info2').innerHTML='等待响应';
        });
        // 跳转成功执行
        $rootScope.$on('$stateChangeSuccess',function(){ 
            document.getElementById('info1').innerHTML='跳转完成！';
        });
        // 跳转失败执行（可能没有找到模板）
        $rootScope.$on('$stateChangeError',function(){
            document.getElementById('info1').innerHTML='跳转错误！';
        });
        // 跳转没有找到（可能没有声明state）
        $rootScope.$on('$stateNotFound',function(){
            document.getElementById('info1').innerHTML='跳转没有找到！';
        });

        // 视图加载中
        $rootScope.$on('$viewContentLoading',function(){
            document.getElementById('info2').innerHTML='视图...ing';
        });
        // 视图加载完成
        $rootScope.$on('$viewContentLoaded',function(){
            document.getElementById('info2').innerHTML='视图...ok';
            
        });
    });

    // 为post而设
    myApp.config(function($httpProvider){
        $httpProvider.defaults.transformRequest=function(obj){
            var str=[];
            for(var p in obj){
                str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };
        $httpProvider.defaults.headers.post={'Content-Type':'application/x-www-form-urlencoded'};   
    });

    // 路由
    myApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login'); //重定向
        $stateProvider
        .state('login', {
            url: '/login',
            data : { pageTitle: '登陆' },
            templateUrl: 'tpls/login.html'
        })

        //插件库
        .state('plugs',{
            url: '/plugs',
            views:{
                '':{
                    templateUrl: 'tpls/plugs.html'
                }
            }
        })

        // 计算器
        .state('calculator',{
            url: '/calculator',
            views:{
                '':{
                    templateUrl: 'tpls/calculator.html'
                }
            }
        });
    });

    //回车
    myApp.directive('ngEnter', function () {
      return function (scope, element, attrs) {
          element.bind("keypress", function (event) {
              if (event.which === 13) {
                  scope.$apply(function () {
                      scope.$eval(attrs.ngEnter);
                  });
                  event.preventDefault();
              }
          });
      };
    });

    myApp.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
                element.bind('blur', function () {
                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    }]);

   return myApp; 
});

