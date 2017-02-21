'use strict';

angular.module('app').directive('appPositionClass', [function(){
	return {
		restrict: 'A',
		replace: true,
		scope: {
			com: '='
		},
		templateUrl: 'view/template/positionClass.html',
		link: function($scope){
			// $scope.isActive = 0;
			$scope.showPositionList = function(idx){
				  $scope.positionList = $scope.com.positionClass[idx].positionList;
        		  $scope.isActive = idx;	
			};
			//监听scope对象的属性，少用
			$scope.$watch('com', function(newVal){
				if(newVal){
					$scope.showPositionList(0);
				}
			});

		}
	};
}]);