var app = angular.module('App', 
[
	'snap', 'toaster', 'ngRoute','ngResource','ngTouch','angular-carousel', 'angularSpinner',
	'FSPartials','kinvey', 'toaster', 'apps.constants', 'ui.bootstrap'
]);

app.config(['$routeProvider','URI_PATH', function($routeProvider, URI_PATH) {
    $routeProvider.
      otherwise({
        redirectTo: '/home'
      });
  }]).run(['$kinvey','$location', 'URI_PATH', '$rootScope',function($kinvey, $location, URI_PATH, $rootScope) {

      var user = $kinvey.getActiveUser();

      if(user === null) {
        $location.path(URI_PATH.login);
      }

      $rootScope.$on('$routeChangeStart', function(currRoute, prevRoute){

        var user = $kinvey.getActiveUser();

        if($location.path() == URI_PATH.registration) {
          //do nothing
        } else if(user === null) {
          $location.path(URI_PATH.login);
        } 
      });

  }]); 

/* httpInterceptor is used to examine each http request
 * and determine if a request to the backend has failed
 * by checking relevant the status code where necessary
 */
app.config(['$provide','$httpProvider', function($provide, $httpProvider) {
  
  $provide.factory('httpInterceptor', ['$q', 'toaster', function($q, toaster){
    return {
      'response': function(response) {
        console.log(response);
        return response || $q.when(response);
      },
      'responseError': function(rejection) {
        console.log(rejection);
        if(rejection.status == 404) {
          toaster.pop(ERROR_MSG.type.error, ERROR_MSG.title.connectionError, ERROR_MSG.connectionFailed, 0);
          return $q.reject(rejection)
        }
        return $q.reject(rejection);
      }
    };
  }]);

  $httpProvider.interceptors.push('httpInterceptor');
}]);

