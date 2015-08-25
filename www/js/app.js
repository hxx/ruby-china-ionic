angular.module('rubyChina', ['ionic', 'ionic-material', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform, $ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    document.addEventListener('touchstart', function (event) {
      // workaround for Android
      if ($ionicSideMenuDelegate.isOpenLeft()) {
        event.preventDefault();
      }
    });

    // set rootUrl for API
    window.localStorage.setItem("apiRootUrl", "https://ruby-china.org/api/v3");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'appCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('app.topics', {
    url: '/topics',
    views: {
      'menuContent': {
        templateUrl: 'templates/topics.html',
        controller: 'topicsCtrl'
      }
    }
  })

  .state('app.excellent', {
    url: '/excellent',
    views: {
      'menuContent': {
        templateUrl: 'templates/topics.html',
        controller: 'excellentCtrl'
      }
    }
  })

  .state('app.popular', {
    url: '/popular',
    views: {
      'menuContent': {
        templateUrl: 'templates/topics.html',
        controller: 'popularCtrl'
      }
    }
  })

  .state('app.recent', {
    url: '/recent',
    views: {
      'menuContent': {
        templateUrl: 'templates/topics.html',
        controller: 'recentCtrl'
      }
    }
  })

  .state('app.noreply', {
    url: '/noreply',
    views: {
      'menuContent': {
        templateUrl: 'templates/topics.html',
        controller: 'noreplyCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

var rubyChina = angular.module('rubyChina');
