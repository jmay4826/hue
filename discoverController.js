angular
  .module("hueApp")
  .controller("discoverController", function($scope, discoverService) {
    var storedBridge = localStorage.getItem("storedBridge");
    if (storedBridge) {
      $scope.bridges = [storedBridge];
      console.log(storedBridge);
    }
    $scope.saveBridge = function(ip) {
      localStorage.setItem("storedBridge", ip);
      console.log(localStorage.getItem("storedBridge"));
    };
    $scope.getBridges = discoverService
      .discoverBridges()
      .then(function(result) {
        $scope.bridges = result;
        console.log($scope.bridges);
      });
  });
