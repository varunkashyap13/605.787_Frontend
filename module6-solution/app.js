(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.userInput = "";
  $scope.message = "";
  $scope.styleMessage = "";
  $scope.styleBox = "";


  $scope.checkInput = function () {
    $scope.message = "";
    var input = $scope.userInput;
    var numItems = 0;

    if (input === "" || input.length === 0){
      $scope.message = "Please enter data first."
      $scope.styleMessage = "color: red; "
      $scope.styleBox = "border-color: red";
    } else {
      var lunchItems = $scope.userInput.split(',');

      for (var i = 0; i < lunchItems.length; i++){
        if (lunchItems[i] !== "" && lunchItems[i].length !== 0 && lunchItems[i] !== " ") {
          numItems++;
        }
      }

      if (numItems <= 3) {
        $scope.message = "Enjoy!"
      } else {
        $scope.message = "Too much!"
      }
      $scope.styleMessage = "color: green;"
      $scope.styleBox = "border-color: green";
    }
  }

}
})();
