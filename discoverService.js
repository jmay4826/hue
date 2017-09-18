angular.module("hueApp").service("discoverService", function($http) {
  this.discoverBridges = function() {
    return $http
      .get("https://www.meethue.com/api/nupnp")
      .then(function(response) {
        return response.data;
      });
  };
});
