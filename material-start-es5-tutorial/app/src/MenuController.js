(function(){

  var menu = angular.module('menu', []);

  menu.controller('MenuController', [
          '$scope', '$mdSidenav', '$mdBottomSheet', MenuController
       ]);

  function MenuController($scope, $mdSidenav, $mdBottomSheet) {

    $scope.selected = 'Page';
    $scope.menus = ['Dashboard', 'Page', 'Entity'];
    // self.selectUser   = selectUser;
    // self.toggleList   = toggleUsersList;

    // function toggleUsersList() {
    //   $mdSidenav('left').toggle();
    // }

    $scope.selectMenu = function(menu) {
      console.log(menu)
      $scope.selected = menu;
      // self.toggleList();
    };
  }

})();
