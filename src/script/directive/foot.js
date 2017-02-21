'use strict';

angular.module('app').directive('appFoot', [function(){
	return {
		restrict: 'A',
		replace: true, //替换dom元素
		templateUrl: 'view/template/foot.html'
	};
}]);