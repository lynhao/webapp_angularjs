'use strict';

angular.module('app').directive('appHeadBar', [function(){
	return {
		restrict: 'A',  //EAMC 属性，元素，样式，注释
		replace: true,
		templateUrl: 'view/template/headBar.html',
		scope: {
			text: '@'
		},
		link: function(scope,element,attr){
			scope.back = function(){
				window.history.back();
			};
			
		}
	};
}]);
