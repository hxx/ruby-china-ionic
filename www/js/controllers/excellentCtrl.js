rubyChina.controller('excellentCtrl',
[
  '$scope',
  '$state',
  '$timeout',
  '$ionicLoading',
  '$ionicPopup',
  '$cordovaToast',
  'Topics',
  function($scope, $state, $timeout, $ionicLoading, $ionicPopup, $cordovaToast, Topics) {
    $ionicLoading.show({
      template: 'Loading...'
    });

    $scope.viewTitle = "精华贴";

    $scope.offset = 0;
    $scope.topics = [];

    $scope.loadMoreTopics = function() {
      Topics.get(
        {
          type: 'excellent',
          offset: $scope.offset,
          limit: 10,
          timeout: 3000
        }
      )
      .$promise.then(
        function(value) {
          $ionicLoading.hide();
          $scope.topics.push.apply($scope.topics, value["topics"]);
          window.localStorage["topics"] = JSON.stringify($scope.topics);
          $scope.moreTopics = value["topics"];
          $scope.offset += 10;
          $scope.$broadcast('scroll.infiniteScrollComplete')
        },
        function(error) {
          $ionicLoading.hide();
          $scope.topics = JSON.parse(window.localStorage["topics"]);
          $ionicPopup.alert({
            title: "网络连接发生错误",
          });
        }
      );
    }

    $scope.loadMoreTopics();

    $scope.moreTopicsCanBeLoaded = function() {
      if ($scope.moreTopics && $scope.moreTopics.length != 0) {
        return true;
      }
      else {
        return false;
      }
    }

    // pull to refresh
    $scope.refreshTopics = function() {
      $timeout(function() {
        $scope.offset = 0;
        $scope.topics = [];

        Topics.get(
          {
            type: 'excellent',
            offset: $scope.offset,
            limit: 10,
            timeout: 3000
          }
        )
        .$promise.then(
          function(value) {
            $scope.topics.push.apply($scope.topics, value["topics"]);
            window.localStorage["topics"] = JSON.stringify($scope.topics);
            $scope.moreTopics = value["topics"];
            $scope.offset += 10;
          },
          function(error) {
            $scope.topics = JSON.parse(window.localStorage["topics"]);
            $ionicPopup.alert({
              title: "网络连接发生错误",
            });
          }
        )
        .finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
        })
      }, 1000);
    };
  }
])
