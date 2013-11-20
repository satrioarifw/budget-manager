budgetControllers.controller('LoginCtrl', ['$scope', '$http', '$location', 'UserService',
	function LoginCtrl($scope, $http, $location, userSrv) {

		$scope.logIn = function(user) {
			$http.post("http://localhost:3000/login", user, {withCredentials: true}).success(function(data) {
	    		userSrv.isLogged = true;
				userSrv.username = "kdelemme";
				
				$location.path("/accounts");
		    });
		};
	}
]);