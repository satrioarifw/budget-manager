function AccountsCtrl($scope, $http) {
	$http.get('mock/accounts.json').success(function(data) {
      $scope.accounts = data;
    });

    $http.get('mock/categories.json').success(function(data) {
      $scope.categories = data;
    });

    //init addRecordForm
    var defaultAddRecordForm = {
        amount: 0.0,
        type: 0,
        category: "Utilities",
        description: ""
    };
    
    $scope.record = defaultAddRecordForm

    $scope.getBalance = function() {
    	var records = $scope.accounts.records;
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
    	var amount = Number(record.amount);
    	if (isNaN(amount) || amount <= 0) {
    		$scope.record = defaultAddRecordForm;
    		return ;
    	}

    	$scope.addRecordForm.$setPristine();

    	//Create the new record with form input values
    	var r 			= new Object();
    	r.category 		= record.category;
    	r.description 	= record.description;
    	r.date 			= new Date().getTime();
    	r.amount 		= amount;
    	r.is_expense 	= record.type == 0 ? true : false;

    	//Set form inputs with default values
    	$scope.record = defaultAddRecordForm;

    	return $scope.accounts.records.push(r);
    };

    $scope.deleteRecord = function(record) {
    	var records = $scope.accounts.records;
    	for (var recordKey in records) {
    		if (records[recordKey].id == record.id) {
    			$scope.accounts.records.splice(recordKey, 1);
    			return ;
    		}
    	}
    }
}