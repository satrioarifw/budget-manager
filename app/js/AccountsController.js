budgetControllers.controller('AccountListCtrl', ['$scope', '$http',
	function AccountListCtrl($scope, $http) {
		$scope.accounts = [];

	    $http.get('http://localhost:3000/accounts', {withCredentials: true}).success(function(data) {
	    	$scope.accounts = data;
	    });


	    $scope.addAccount = function(account) {
	    	if (account === undefined || account.name == null || account.currency == null) {
	    		return ;
	    	}
	    	//Create the new account with form input values
	    	var a 		= new Object();
	    	a.name 		= account.name;
	    	a.currency 	= account.currency;
	    	a.records 	= new Array();
	    	a.balance 	= 0;

	    	//Save Account
	    	$http.post('http://localhost:3000/accounts', a, {withCredentials: true}).success(function(data) {
	    		a.id = data.id;
		    	$scope.accounts.push(a);
		    });
	    };

	    $scope.deleteAccount = function(accountId) {
	    	$http.delete('http://localhost:3000/accounts/' + accountId, {withCredentials: true}).success(function(data) {
	    		var accounts = $scope.accounts;
		    	for (var accountKey in accounts) {
		    		if (accounts[accountKey].id == accountId) {
		    			$scope.accounts.splice(accountKey, 1);
		    			return ;
		    		}
	    		}
		    });
	    };

	}]);
 
budgetControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
	function AccountDetailCtrl($scope, $routeParams, $http, $location) {
		$scope.categories 	= [];
		$scope.account 		= {};
		var account_id		= $routeParams.accountId;

		$http.get('http://localhost:3000/accounts/' + account_id, {withCredentials: true}).success(function(data) {
			$scope.account = data;
		}).error(function(data, status) {
			$location.path("/accounts");
		});

		$http.get('http://localhost:3000/categories', {withCredentials: true}).success(function(data) {
	    	$scope.categories = data;
	    })

		//TODO Calculated by Node.js, use $scope.account.balance, delete this method
	    $scope.getBalance = function() {
	    	var records = $scope.account.records;
	    	var balance = 0.0;
	    	for (var recordKey in records) {
	    		if (records[recordKey].is_expense) {
	    			balance -= records[recordKey].amount;
	    		}
	    		else {
	    			balance += records[recordKey].amount;
	    		}
	    	}
	    	return balance;
	    };

	    $scope.addRecord = function(record) {
	    	if (record === undefined) {
	    		return ;
	    	}

	    	var amount = Number(record.amount);
	    	if (isNaN(amount) || amount <= 0) {
	    		return ;
	    	}

	    	//Create the new record with form input values
	    	var r 			= new Object();
	    	r.category 		= record.category;
	    	r.description 	= record.description;
	    	r.date 			= new Date().getTime();
	    	r.amount 		= amount;
	    	r.is_expense 	= record.type == 0 ? true : false;
	    	r.account_id	= account_id;


	    	//Save Record
	    	$http.post('http://localhost:3000/accounts/' + account_id + '/records', r, {withCredentials: true}).success(function(data) {
	    		r.id = data.id;
	    		//TODO Add data.balance with the new balance updated from the server
		    	$scope.account.records.push(r)
		    });
	    };

	    $scope.deleteRecord = function(record) {
	    	$http.delete('http://localhost:3000/accounts/' + account_id + '/records/' + record.id, {withCredentials: true}).success(function(data) {
		    	var records = $scope.account.records;
		    	for (var recordKey in records) {
		    		if (records[recordKey].id == record.id) {
		    			return $scope.account.records.splice(recordKey, 1);
		    		}
		    	}
		    });
	    };

	    function displayChart() {
	    	var records = $scope.account.records;
	    	var totalExpense = 0;
	    	var totalIncome = 0;

	    	for (var recordKey in records) {
	    		if (records[recordKey].is_expense) {
	    			totalExpense += records[recordKey].amount;
	    		}
	    		else {
	    			totalIncome += records[recordKey].amount;
	    		}
	    	}

	    	var pieData = [{value: totalExpense,color:"#F38630"},
		        		{value : totalIncome,color : "#E0E4CC"}];


	      	//Display the data
	    	new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
	    };
	}]);
