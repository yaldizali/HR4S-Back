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

    $scope.getRequest = function() {
        console.log("getRequest'e girdik");
        $http({
            method: 'GET',
            url: 'api/request'
         }).then(function (response){
            // $scope.allTickets = response["data"]["data"];
            console.log(response["data"]["data"]);
            $scope.nameAndSurname = response["data"]["data"][0]["nameandsurname"];
            $scope.department = response["data"]["data"][0]["department"];
            $scope.requestDate = new Date(response["data"]["data"][0]["requestdate"]);
            $scope.requestType = response["data"]["data"][0]["requesttype"];
            $scope.dayCount = response["data"]["data"][0]["daycount"];
            $scope.startDate = new Date(response["data"]["data"][0]["startdate"]);
            $scope.nextDate = new Date(response["data"]["data"][0]["nextdate"]);
            $scope.phone = response["data"]["data"][0]["phone"];
            $scope.replacementEmployee = response["data"]["data"][0]["replacementemployee"];
            $scope.address = response["data"]["data"][0]["address"];
         },function (error){
            console.log("error çalıştı: " + error);
         });
    };
});