rubyChina.factory('Topics', ['$resource', function($resource) {
  var Topics = $resource(window.localStorage.getItem("apiRootUrl") + '/topics',
    {
      access_token: window.localStorage.getItem("access_token")
    }
  );
  return Topics;
}])
