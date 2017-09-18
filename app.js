angular
  .module("hueApp", ["ui.router", "ngMaterial"])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/view");
    $stateProvider
      .state("discover", {
        url: "/discover",
        templateUrl: "discover.html",
        controller: "discoverController"
      })
      .state("viewState", {
        url: "/view",
        templateUrl: "view.html",
        controller: "viewController"
      });
  });
