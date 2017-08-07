define(['app'], function(app){ 
    app.controller('plugsCtrl', ['$rootScope','$scope','Upload','$alert','$log','$timeout','$http','$ionicLoading', function($rootScope,$scope,Upload,$alert,$log,$timeout,$http,$ionicLoading){
        // moment demo
        $scope.now_datetime = function(){
            $scope.now_datetime_txt = moment().format('YYYY年 MMMM Do dddd a h:mm:ss ');
            $timeout(function(){
                $scope.now_datetime();
            },100)
        };
        $scope.now_datetime();

        // 设置日期格式
        $scope.datepickerConfig = {
            allowFuture: false,
            dateFormat: 'YYYY-MM-DD'
        };

        // angularjs
        $scope.ping = 'AngularJs is running';

        // AngularStrap - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // alert
        $scope.alert_panel = {
            "title": "警告!",
            "content": "<i class='fa fa-fw fa-exclamation-circle'></i> 别点我，好疼。",
            "type": "danger"
        };

        $scope.plug_alert = function(icon,title,content,type,duration,placement){
            icon = '<i class="fa '+icon+' fa-fw"></i>';
            title = '<b>'+title+'</b>';
            content = icon+' '+title+' '+content;
            $alert({title: '', content: content, placement: placement, type: type, duration: duration});
        };

        $scope.alert_service = function(){
            $scope.plug_alert('fa-heart','亲爱的','看这里！看这里！看这里！','info',5,'bottom-right');
        };

        // tooltip_txt
        $scope.tooltip_txt = {
            "title": "沉舟侧畔千帆过，病树前头万木春。"
        };

        // popover
        $scope.popover = {
            "title": "我是标题",
            "content": "人与人间的信任，就像是纸片，一旦破损，就不会再回到原来的样子。"
        };

        // button
        $scope.button = {
            "toggle": false,
            "checkbox": {
                "left": true,
                "middle": false,
                "right": false
            },
            "radio": "left"
        };

        // 下拉
        $scope.selectedIcon = 'Heart';    //默认下拉值
        $scope.icons = [
            {value: 'Gear', label: '<i class="fa fa-gear"></i> Gear'},
            {value: 'Globe', label: '<i class="fa fa-globe"></i> Globe'},
            {value: 'Heart', label: '<i class="fa fa-heart"></i> Heart'},
            {value: 'Camera', label: '<i class="fa fa-camera"></i> Camera'}
        ];

        // tabs
        $scope.tabs = [
        {
            "title": "选项卡一",
            "content": "选项卡一的内容."
        },
        {
            "title": "选项卡二",
            "content": "选项卡二的内容."
        },
        {
            "title": "选项三不能点",
            "content": "选项三的内容.",
            "disabled": true
        }
        ];
        $scope.tabs.activeTab = "Home"; //默认tab
        $scope.pushTab = function(){
            var now_time = new Date();
            $scope.tabs.push({"title":now_time,"content":now_time});
        };

        // 自定义tab
        $scope.tab_login = 1;

        // 设置active
        $scope.set_active = function(e){
            $scope.active_is = e;
        };
        $scope.active_is = 1;

        // 文件上传 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

        //选择文件
        $scope.chose_file = function(){
            $scope.upload_ok = false;
            $scope.progress_bar = 0;
        };

        //点击上传文件
        $scope.start_upload = function (file_name,file_type) {
            Upload.upload({
                url: 'https://ycmbcd.github.io/angular-strap-plugs/fuck/uploads.php',
                data: {'file_name': file_name,'file_type':file_type},
                file: $scope.upload_file //上传的文件
            }).progress(function (evt) {
                //进度条
                $scope.progress_bar = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data) {
                if(data === 'ok'){
                    $timeout(function(){
                        $scope.upload_ok = true;
                        $scope.upload_file = '';
                        //保存数据
                        $scope.plug_alert('fa-heart','恭喜！','文件上传成功','success',5,'top-right');
                        
                    },1000);
                }
            }).error(function (data) {
                //上传失败
                console.log('上传错误信息: ' + data);
            });
        };

        // POST测试 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        $scope.post_demo = function(){
            var post_data = {
                plug_demo:'POST测试正常。'
            };
            var post_url = 'https://ycmbcd.github.io/angular-strap-plugs/fuck/post_demo.php';

            $http({  
                method: 'POST',  
                url: post_url,  
                data: post_data
            }).success(function (data) { 
                $scope.post_res = data;
            });

        };
        
    }]);

    // 默认效果
    app
    .config(function($modalProvider) {
        angular.extend($modalProvider.defaults, {     //modal 效果
            animation: 'am-flip-x'
        });
    })
    .config(function($asideProvider) {
        angular.extend($asideProvider.defaults, {     //aside 效果
            animation: 'am-fadeAndSlideLeft',
            placement: 'left'
        });
    })
    .config(function($alertProvider) {
        angular.extend($alertProvider.defaults, {   //alert 效果
            container: 'body'
        });
    })
    .config(function($tooltipProvider) {
        angular.extend($tooltipProvider.defaults, {   //tooltip 效果
            animation: 'am-flip-x',
            trigger: 'hover'
        });
    })
    .config(function($popoverProvider) {
        angular.extend($popoverProvider.defaults, {   //popover 效果
            animation: 'am-flip-x',
            trigger: 'focus',
            placement: 'right'
        });
    })
    .config(function($tabProvider) {
        angular.extend($tabProvider.defaults, {     //tab 效果
            animation: 'am-flip-x'
        });
    })
    .config(function($selectProvider) {
        angular.extend($selectProvider.defaults, {    //select 效果
            animation: 'am-fade-and-scale',
            sort: false
        });
    });

    return app;
});
