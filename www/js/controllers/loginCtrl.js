rubyChina.controller('loginCtrl',
[
  '$scope',
  '$state',
  '$ionicHistory',
  '$cordovaToast',
  'loginService',
  function($scope, $state, $ionicHistory, $cordovaToast, loginService) {
  if (loginService.isLoggedIn()) {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go("app.playlists");
  }
  $scope.login = function(user) {
    loginService.login(user);
  };
}])
