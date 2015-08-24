rubyChina.controller('appCtrl',
[
  '$window',
  '$scope',
  '$http',
  '$state',
  '$timeout',
  '$ionicHistory',
  '$ionicPopover',
  '$cordovaToast',
  'ionicMaterialInk',
  'ionicMaterialMotion',
  'loginService',
  function($window, $scope, $http, $state, $timeout, $ionicHistory, $ionicPopover, $cordovaToast, ionicMaterialInk, ionicMaterialMotion, loginService) {

  // Activate ink for controller
  ionicMaterialInk.displayEffect();

  // Set Motion
  ionicMaterialMotion.ripple();
}])
