(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoryItemsController', CategoryItemsController);
    
    CategoryItemsController.$inject = ['item']
    function CategoryItemsController(item) {
      var items = this;
      items.items = item.data.menu_items;
    }
})();
    