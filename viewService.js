angular.module("hueApp").service("viewService", function($http, $timeout) {
  var that = this;
  var production = true;
  if (!production) {
    var baseUrl = "http://localhost:8080/api/newdeveloper/lights/1";
  } else {
    var baseUrl =
      "http://192.168.1.65/api/aBtBv-ImoH31OXdX1oeP7KLTb93J5qMhMjlnlzMi/lights/";
  }

  this.updateLight = function(index, options) {
    console.log(options);
    if (!production) {
      index = "";
    }
    var update = function(newOptions) {
      return $http({
        method: "PUT",
        url: baseUrl + index + "/state",
        data: newOptions
      }).then(function(res) {
        console.log(res);
      });
    };

    if (options.hex) {
      options.colormode = "xy";
      options.rgb = [
        options.hex.substr(1, 2),
        options.hex.substr(3, 2),
        options.hex.substr(5, 2)
      ];
      delete options.hex;
    }

    if (options.rgb) {
      options.xy = rgb_to_cie(...options.rgb);
      delete options.rgb;
    }

    /* TODO: Sometimes "alert" flashes in the middle of 
    the color transition, which looks ugly */

    if (options.alert) {
      delete options.alert;
      options.transitiontime = 0;
      return update(options).then(
        $timeout(function() {
          update({ alert: "select" });
        }, 20)
      );
    }

    return update(options);
  };

  this.getStatus = function() {
    return $http.get(baseUrl).then(function(response) {
      console.log(response);
      if (!production) {
        response.data = { 1: response.data };
      }
      for (var lightIndex in response.data) {
        response.data[lightIndex].state.rgb = cie_to_rgb(
          ...response.data[lightIndex].state.xy
        );
        response.data[lightIndex].state.hex = rgb_to_hex(
          response.data[lightIndex].state.rgb
        );
      }
      return response;
    });
  };
});
