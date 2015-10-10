angular.module("app").controller('mvMainCtrl',function($scope){
	//$scope.myVar="Hello Angular";
	$scope.courses=[
	{name:'MongoDB', type:'Database',published:2015,backend:true},
	{name:'ExpressJS',type:'Backend Framework',published:2011,backend:true},
	{name:'AngularJS',type:'Frontend MVC Framework',published:2013,backend:false},
	{name:'NodeJS',type:'Backend Framework',published:2012,backend:true}]
});