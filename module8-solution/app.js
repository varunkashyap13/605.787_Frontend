(function () {
    'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")

function FoundItemsDirective() {
  var ddo ={
      scope : {
        found:"<",
        remove : "&"
      },
      templateUrl : "foundItems.html",
      controller : FoundItemsDirectiveController,
      controllerAs : 'itemFound',
      bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var itemFound = this;

  itemFound.resultsFound = function() {
    if(itemFound.found.length == 0){
      return false;
    } else {
    return true;
    }
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrow = this ;
    narrow.found = [];

  narrow.removeMenuItem = function (index) {
    MenuSearchService.removeItem(index);
  }

   narrow.getItems = function (searchTerm) {
     var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
     promise.then(function(items){
       narrow.found = items;
       if(narrow.found.length > 0 ){
          narrow.results = false ;
       } else {
          narrow.results = true ;
       }
     });
   }
  }

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
    var menu = this ;
    var foundItems = [];

    menu.getMatchedMenuItems = function (searchTerm) {
         return $http({
        method : "GET",
        url : (ApiBasePath + "/menu_items.json"),
        params:{}
      })
      .then(function(result) {
        foundItems  = getMatchedData(searchTerm,result);
        return foundItems;
      });
    }

    menu.removeItem = function(index){
      foundItems.splice(index,1);
    }

    function getMatchedData(searchTerm,result) {
      var returnItems = [];
      if(!searchTerm){
        return  returnItems ;
      }
      var items  =  result.data.menu_items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                returnItems.push(items[i]);
      }
    }
    return returnItems ;
  }
}
})();