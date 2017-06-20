(function() {
	//导航栏滚动
	window.onscroll = function(e) {
		let wTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(wTop >= 36) {
			$("#nav").css({
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'width': '100%',
				'background': '#fff',
				'z-index': '10000000'
			});
		} else {
			$("#nav").css({
				'position': 'static'
			});
		}
	}
}())

//创造数据
const data = Mock.mock({
	"peo_buy|10": [{
		"time|1-12": 3,
		"user": "@name",
		"href": "#",
		"product": "樱花3号514期"
	}],
	"collect|4": [{
		"title": "樱花3号515期",
		"year|5.5-10": 7.5,
		"days|180-360": 200,
		"money|0-1000000": 5000,
		"load|0-100": 50,
		"qi|1000-1000000": 1000,
		"status": "@boolean"
	}],
	"banner_line": {
		"serviceTime|300-1800": 500,
		"total|1008556-120999554466": 100,
		"get|600000-9955995598": 40
	}
})
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	//大家都在抢
	$scope.peo_buy = data.peo_buy;
	//精选
	$scope.collect = data.collect;
	//获取屏幕的宽
	$scope.pw = document.documentElement.clientWidth || document.body.clientWidth;
	//将图片等分12份
	$scope.l12 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	//获取分为多少个等块
	$scope.fdg = $scope.l12.length;
	//轮播图的渲染
	$scope.banner = [{
			'img': 'img/6B3D96511C147F1E61F255A1728E9123.jpg',
			'href': 'javascript:;',
			'status': 'active'
		},
		{
			'img': 'img/3806462F10659E7279101FBCA31DDD80.jpg',
			'href': 'javascript:;',
			'status': ''
		},
		{
			'img': 'img/6B38F18D7917A4E8DC63DCF3A5EF3545.jpg',
			'href': 'javascript:;',
			'status': ''
		},
		{
			'img': 'img/7E323430F3FA411A3CCB366625293730.jpg',
			'href': 'javascript:;',
			'status': ''
		}
	]
	//点击的下标
	$scope.cIndex = 0;
	//获取当前轮播图的下标
	$scope.thIndex = $scope.banner.length - 1;
	//判断动画结束了么
	$scope.tf = 1;
	//轮播切换
	$scope.toggle = function(index) {
		//清除轮播
		//					clearInterval($scope.autoplay);
		//设置当前的index
		$scope.cIndex = index;
		if($scope.banner.length - 1 - index == $scope.thIndex) {
			return;
		}
		$scope.tf = 0;
		//切换白点
		$("#banner_focus>li").removeClass('active').eq(index).addClass('active');
		//					for(let i of $scope.banner) {
		//						i.status = '';
		//					}
		//					$scope.banner[index].status = 'active';
		//将当前图片放在上面
		$(".byc" + $scope.thIndex).css('z-index', 3);
		//将你选择得的图片放在当前图片的下面
		$(".byc" + ($scope.banner.length - 1 - index)).css('z-index', 2);
		//轮播动画
		for(let i = 0; i < $scope.fdg; i++) {
			setTimeout(function() {
				$(".byc" + $scope.thIndex).find('span').eq(i).addClass('hide');
			}, 50 * i)
		}
		setTimeout(function() {
			//动画结束后清除
			$(".hide").css('z-index', -1).removeClass('hide');
			//将图片放在底层
			$(".byc" + $scope.thIndex).css('z-index', 1);
			//更改当前图片
			$scope.thIndex = $scope.banner.length - 1 - index;
			//改变动画状态值
			$scope.tf = 1;
		}, $scope.fdg * 60)
	}
	//自动轮播
	$scope.autoplay = setInterval(function() {
		++$scope.cIndex >= $scope.banner.length ? $scope.cIndex = 0 : 1;
		$scope.toggle($scope.cIndex);
		console.log($scope.cIndex)
	}, 5000);

	//banner_line
	$scope.banner_line = data.banner_line;
	$scope.serviceTime = $scope.banner_line.serviceTime;
	//				$scope.init = function(t){
	//					let sTime = setInterval(function(){
	//						(function(){
	//							$scope.serviceTime += Math.ceil(Math.random()*10);
	//							if($scope.serviceTime >= $scope.banner_line.serviceTime){
	//								clearInterval(sTime);
	//								console.log($scope.serviceTime)
	//								$scope.serviceTime = $scope.banner_line.serviceTime;
	//							}
	//						}())
	//					},1)
	//				}
	//				$scope.init();
})

//登录
$("#showLogin").on('click', function() {
	$("#login").show();
	$("body").css({'overflow':'hidden'})
})
$("#closeLogin").on('click', function() {
	$("#login").hide();
	$("body").css({'overflow':'auto'})
})
