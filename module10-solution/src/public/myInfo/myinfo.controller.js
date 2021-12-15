(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['MenuService','ApiPath'];
    function MyInfoController(MenuService,ApiPath) {
        var myInfo = this;
        myInfo.user = MenuService.getData();
        myInfo.item =  MenuService.getMenuItem(myInfo.user.menuItem);
        myInfo.basePath = ApiPath;
        myInfo.checkForm = function () {
           if(myInfo.user.firstName === "") {
            return false;
           } else {    
          return true;
           }
        }
    
    myInfo.item.then(function (response) {
      myInfo.menuItem = response ;
    })
    
    myInfo.checkMenuItem = function () {
      if(myInfo.menuItem === null) {
        return false;
      } else {
        return true;
      }
    }
    if(myInfo.user.firstName === "") {
      myInfo.signUp = true;
      }
    }
    })();
    