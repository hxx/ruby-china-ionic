rubyChina.factory('loginService',
[
  '$http',
  '$state',
  '$cordovaToast',
  '$ionicPopup',
  '$ionicLoading',
  function($http, $state, $cordovaToast, $ionicPopup, $ionicLoading) {
  return {
    login: function(user) {
      if (user != undefined) {
        $ionicLoading.show({
          template: 'Loading...',
        });

        $http({
          method: 'POST',
          url: 'https://ruby-china.org/oauth/token',
          params: {
            grant_type: 'password',
            username: user.username,
            password: user.password
          },
          timeout: 5000
        })
        .success(function (data) {
          $ionicLoading.hide();
          window.localStorage.setItem("access_token", data.access_token);
          $state.go('app.topics');
          $cordovaToast.show('登录成功！', 'short', 'bottom');
        })
        .error(function (data, status) {
          console.log(status);
          $ionicLoading.hide();
          if (status === 0) {
            $ionicPopup.alert({
              title: "网络连接发生错误",
            });
          }
          else if (status === 401 ) {
            $cordovaToast.show('用户名或密码错误', 'long', 'bottom');
          }
        });
      }
      else {
        $cordovaToast.show('请输入用户名和密码', 'long', 'bottom');
      }
    },

    isLoggedIn: function() {
      if(window.localStorage.getItem("access_token") !== null) {
        return true;
      }
      else {
        return false;
      }
    },

    logout: function() {
      window.localStorage.removeItem("access_token");
      $state.go('login');
      $cordovaToast.show('您已退出登录', 'short', 'bottom');
    }
  }
}])
