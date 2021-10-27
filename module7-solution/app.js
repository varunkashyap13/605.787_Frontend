(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('totalPrice', totalPriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuy();

  toBuy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'totalPriceFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, totalPriceFilter) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBought();

  bought.total = function (itemIndex) {
    var total = ShoppingListCheckOffService.total(itemIndex);
    total = totalPriceFilter(total);
    return total;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  //List of items to Buy
  var toBuy = [
    { name: "cookies", quantity: 2, pricePerItem: 1 },
    { name: "milk", quantity: 1, pricePerItem: 4 },
    { name: "bread", quantity: 2, pricePerItem: 3 },
    { name: "chips", quantity: 5, pricePerItem: 2 },
    { name: "frozen pizza", quantity: 8, pricePerItem: 10 },
    { name: "peanut butter", quantity: 4, pricePerItem: 5 },
    { name: "bananas", quantity: 10, pricePerItem: 6 },
    { name: "tums", quantity: 3, pricePerItem: 12 }
  ];

  //List of items Bought
  var bought = [];
  var itemTotal = 0;

  //returns toBuy items
  service.getToBuy = function () {
    return toBuy;
  }

  //returns bought items
  service.getBought = function () {
    return bought;
  }

  service.removeItem = function (itemIndex) {
    bought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex, 1);
  }

  service.total = function (itemIndex) {
    itemTotal = bought[itemIndex].quantity * bought[itemIndex].pricePerItem
    return itemTotal;
  }
}


function totalPriceFilter() {
  return function (input) {
    input = input || "";
    input = "$$$" + input;
    return input;

  }
}

})();
