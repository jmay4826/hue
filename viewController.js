angular
  .module("hueApp")
  .controller("viewController", function($scope, $timeout, viewService) {
    $scope.getImage = function(light) {
      if (!light.modelid) {
        return "e27_waca.svg";
      }
      if (light.modelid.substr(0, 3) == "LCT") {
        return "e27_waca.svg";
      } else {
        return "bloom.svg";
      }
    };

    $scope.updateLight = function(index, options) {
      viewService.updateLight(index, options).then(function(response) {
        $scope.updateStatus();
      });
    };

    $scope.updateStatus = function() {
      console.log("updated");
      return viewService.getStatus().then(function(response) {
        $scope.lights = response.data;
      });
    };
    $scope.updateStatus();
  });
