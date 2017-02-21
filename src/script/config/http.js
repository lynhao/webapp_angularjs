'use strict';

angular.module('app').config(['$provide', function($provide){

	$provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
		//这里我们把post请求改为get
		$delegate.post = function(url, data, config){
			var def = $q.defer();
			$delegate.get(url).success(function(resp){
				def.resolve(resp);
			}).error(function(error){
				def.reject(error);
			});
			return {
				success: function(cb){
					def.promise.then(cb);
				},
				error: function(cb){
					def.promise.then(null, cb);
				}
			};
		};
		return $delegate;
	}]);

}]);