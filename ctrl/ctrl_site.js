define(['app'], function(app){ 

	//面板控制器
	return app.controller('siteCtrl', ['$rootScope','$scope','$state','$http','$log','$timeout','$alert', function($rootScope,$scope,$state,$http,$log,$timeout,$alert){

		// 组件 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		$scope.plug_alert = function(icon,title,content,type,duration,placement){
	        icon = '<i class="fa '+icon+' fa-fw"></i>';
	        title = '<b>'+title+'</b>';
	        content = icon+' '+title+' '+content;
	        $alert({title: '', content: content, placement: placement, type: type, duration: duration,animation: 'am-fade-and-slide-right'});
	    };

		// 默认可以点击获取按钮
		$scope.can_get_phone_code = true;
		$scope.get_phone_code_txt = '获取';
		$scope.can_get_email_code = true;
		$scope.get_email_code_txt = '获取';

		// 手机号验证码
		$scope.get_phone_code = function(){
			$scope.can_get_phone_code = false;
			var i = 60;
			$scope.timeout_phone = function(){
		        if(i === 0){
		            $scope.can_get_phone_code = true;
		            $scope.get_phone_code_txt = '重新获取';
		        }else{
		            $timeout(function(){
	                    i--;
		            	$scope.get_phone_code_txt = i+' 秒';
	                    $scope.timeout_phone();    
	                },1000);
		        }
		    };
		    $scope.timeout_phone();

		    $scope.plug_alert('fa-phone','验证码已发送至：',$scope.reg_phone+' 请注意查收。','success',5,'top-right');
		};

		// 邮箱验证码
		$scope.get_email_code = function(){
			$scope.can_get_email_code = false;
			var i = 60;
			$scope.timeout_email = function(){
		        if(i === 0){
		            $scope.can_get_email_code = true;
		            $scope.get_email_code_txt = '重新获取';
		        }else{
		            $timeout(function(){
	                    i--;
		            	$scope.get_email_code_txt = i+' 秒';
	                    $scope.timeout_email();    
	                },1000);
		        }
		    };
		    $scope.timeout_email();

		    $scope.plug_alert('fa-envelope','验证码已发送至：',$scope.reg_email+' 请注意查收。','success',5,'top-right');
		};

		// 手机号注册
		$scope.reg1_submit = function(){
			$log.info(1);
		};

		// 邮箱注册
		$scope.reg2_submit = function(){
			$log.info(2);
		};

	}]);
});
