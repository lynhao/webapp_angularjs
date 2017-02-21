'use strict';

angular.module('app').controller('favoriteCtrl', ['$scope','$http', function($scope, $http){
		$http.get('data/myFavorite.json').success(function(resp){
			$scope.list = resp;
		});

}]);