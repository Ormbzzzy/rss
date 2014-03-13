angular.module('App').factory('LogoutService',['$kinvey','URI_PATH','$location', function($kinvey, URI_PATH, $location){

	var userLogout = function(onSuccessCallBack, onFailCallBack) {
		//makes service call to kinvey endpoint
        var user = $kinvey.getActiveUser();
        
        if(null !== user) {
            var promise = $kinvey.User.logout();
            
            promise.then(onSuccessCallBack, onFailCallBack);
        }
	};

	return {
		userLogout: userLogout		
    };	
	
}]);