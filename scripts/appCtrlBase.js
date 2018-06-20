// import { format } from "util";

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };
    $scope.styleColors = ["red", "green", "yellow"];
    $scope.cars = [
        {model : "Ford Mustang", color : "red"},
        {model : "Fiat 500", color : "white"},
        {model : "Volvo XC90", color : "black"}
    ];
    $scope.myAlert = function(author)
    {
        console.log(author);
    }
    // when submitting the add form, send the text to the node API
	$scope.insertTicket = function() {
        console.log("insertTicket'a girdik:" + $scope.newAuthor + "," + $scope.newSubject + "," + $scope.newIssue + "," + $scope.newChatUrl);

        $http({
            method: 'POST',
            url: 'api/ticket',
            data: {"author": $scope.newAuthor, "subject": $scope.newSubject, "issue": $scope.newIssue, "chatUrl": $scope.newChatUrl}
         }).then(function (response){
            console.log("post çalıştı: " + response);
         },function (error){
            console.log("error çalıştı: " + error);
         });
    }; 

    $scope.getTickets = function() {
        console.log("getTickets'a girdik");
        $http({
            method: 'GET',
            url: 'api/ticket'
         }).then(function (response){
            $scope.allTickets = response["data"]["data"];
         },function (error){
            console.log("error çalıştı: " + error);
         });
    };
    
    $scope.deleteTicket = function(author) {
        $http({
            method: 'POST',
            url: 'api/delete',
            data: {"parameter": author}
         }).then(function (response){
            console.log("post çalıştı: " + response);
         },function (error){
            console.log("error çalıştı: " + error);
         });
    }
});