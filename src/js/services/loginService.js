angular.module('App').factory('LoginService',['$kinvey', '$location', function($kinvey, $location){

	var userLogin = function(user, onSuccessCallBack, onFailCallBack) {

			//makes service call to kinvey endpoint
			var promise = $kinvey.User.login(user);

			promise.then(onSuccessCallBack, onFailCallBack);
	};

	var isLoginPage = function() {
		return $location.path() == URI_PATH.login ? true : false;
	};

	return {
		userLogin: userLogin,
		isLoginPage: isLoginPage		
    };	
	
}]);