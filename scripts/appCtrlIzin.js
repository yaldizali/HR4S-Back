var app = angular.module("appIzin", []);
app.controller("ctrlIzin", function($scope, $http) {
    $scope.nameAndSurname = "";
    $scope.department = "";
    $scope.date = "";
    $scope.requestType = "";
    $scope.dayCount = "";
    $scope.startDate = "";
    $scope.nextDate = "";
    $scope.phone = "";
    $scope.replacementEmployee = "";
    $scope.address = "";

    $scope.insertRequest = function(){
        var data = {"nameAndSurname": $scope.nameAndSurname, 
                   "department": $scope.department, 
                   "requestDate": $scope.requestDate, 
                   "requestType": $scope.requestType,
                   "dayCount": $scope.dayCount,
                   "startDate": $scope.startDate,
                   "nextDate": $scope.nextDate,
                   "phone": $scope.phone,
                   "replacementEmployee": $scope.replacementEmployee,
                   "address": $scope.address
                  };
        // console.log(data);
        $http({
            method: 'POST',
            url: 'api/request',
            data: data
         }).then(function (response){
            console.log("post çalıştı: " + response);
         },function (error){
            console.log("error çalıştı: " + error);
         });
    }
});