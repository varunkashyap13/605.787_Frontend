(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = {
    menuItem : "",
    firstName : "",
    lastName : "",
    email : "",
    phone : ""
  };

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.setData = function(user) {
    service.user = user;
  }

  service.getData = function () {
    return service.user;
  }

  service.getMenuItem = function (menuItem) {
  var menuVal;
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      for(var i = 0 ; i < response.data.menu_items.length ;  i++){
        if(response.data.menu_items[i].short_name.toLowerCase() === menuItem.toLowerCase()){
          menuVal = response.data.menu_items[i];
          return menuVal;
        }
      }
      return null;
    });
  }
  
  service.getMenuItemName = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json');
  };



}


})();