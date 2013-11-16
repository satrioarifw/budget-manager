function RecordsCtrl($scope, $http) {
	$http.get('mock/records.json').success(function(data) {
      $scope.records = data;
    });

    $scope.getBalance = function() {
    	var records = $scope.records;
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

    $scope.getHumanDate = function(timestamp) {
    	var date = new Date(timestamp*1000);
    	var months = ['Jan','Feb','Mar','Apr','May',
    	'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    	var year = date.getFullYear();
	    var month = months[date.getMonth()];
	    var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		var formattedTime = day + ' ' + month + ' ' + year;
    	return formattedTime;
    };

}