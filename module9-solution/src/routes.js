(function () {
  'use strict';
  
  angular.module('MenuApp')
  .config(RoutesConfig);
  
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise('/');
  
    $stateProvider
  
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })
  
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.template.html',
      controller: 'CategoriesController as categories',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
  
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/templates/items.template.html',
      controller: 'CategoryItemsController as items',
      resolve: {
        item: ['MenuDataService', '$stateParams',
              function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              }]
      }
    });
  }
  })();