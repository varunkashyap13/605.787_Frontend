(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
      var signUpCtrl = this;
        signUpCtrl.user = {
          firstName : "",
          lastName : "",
          email : "",
          phone : "",
          menuItem : "",
        };
        signUpCtrl.validItem = false;
        signUpCtrl.menuSearched = false;

        signUpCtrl.checkItem = function() {
          signUpCtrl.validItem = false;
          signUpCtrl.menuSearched = false;

          if (typeof signUpCtrl.user.menuItem === 'undefined') {
            return false;
          }
          if (signUpCtrl.user.menuItem.trim().length <= 0) {
            return false;
          }

          MenuService.getMenuItemName(signUpCtrl.user.menuItem.toUpperCase()).then(
            function(response) {
              signUpCtrl.validItem = true;
              signUpCtrl.menuSearched = true;
            },
            function(response) {
              signUpCtrl.menuSearched = true;
            }
          )
        }
        signUpCtrl.submit = function () {
          signUpCtrl.searchComplete = true ;
          MenuService.setData(signUpCtrl.user);
        };
      }
    })();
    