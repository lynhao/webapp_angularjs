'use strict';

angular.module('app').directive('appCompany', [function(){
	return {
		restrict: 'A',  //EAMC 属性，元素，样式，注释
		replace: true,
		scope: {
			com: '='
		},
		templateUrl: 'view/template/company.html'
	}
}]);
