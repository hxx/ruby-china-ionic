rubyChina.controller('topicsCtrl',
[
  '$scope',
  '$state',
  '$ionicLoading',
  '$ionicPopup',
  '$cordovaToast',
  'Topics',
  function($scope, $state, $ionicLoading, $ionicPopup, $cordovaToast, Topics) {
    $ionicLoading.show({
      template: 'Loading...'
    });

    Topics.get().$promise.then(
      function(value) {
        $ionicLoading.hide();
        $scope.topics = value["topics"];
        window.localStorage["topics"] = JSON.stringify($scope.topics);
      },
      function(error) {
        $ionicLoading.hide();
        $scope.topics = JSON.parse(window.localStorage["topics"]);
        $ionicPopup.alert({
          title: "网络连接发生错误",
        });
      }
    )
}])
