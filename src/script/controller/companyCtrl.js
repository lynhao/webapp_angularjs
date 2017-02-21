'use strict';

angular.module('app').controller('companyCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http.get('/data/company.json?id='+$state.params.id).success(function(resp){
		$scope.company = resp;
		
	});

}]);