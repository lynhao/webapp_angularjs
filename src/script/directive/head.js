'use strict';

angular.module('app').directive('appHead', ['cache',function(cache){
	return {
		restrict: 'A',  //EAMC 属性，元素，样式，注释
		replace: true,
		templateUrl: 'view/template/head.html',
		link: function(scope){
			scope.name = cache.get('name') || '';
		}
	};
}]);
