//angular.module('js.journeyman').directive('webWorker', function() {
//  var directiveDefinitionObject = {
//    replace: true,
//    template: $(getSnippets()).html(),
//    controller: "WebWorkerController",
//    link: function myLink(scope, iElement, iAttrs) {
//    }
//  };
//
//  return directiveDefinitionObject;
//});

angular.module('js.journeyman').
controller('WebWorkerController', ['$scope', '$q', 'VariableWebWorkerService', function ($scope, $q, $webWorker) {
  $scope.workerResults = [];

  $scope.startWorker = function () {
    $q.when($webWorker.doWork('Worker Working')).then(
      function (data) {
        if (data) {
          if (data.length) {
            $scope.workerResults = data;
          } else {
            $scope.workerResults.push(data);
          }
        }
      },
      function () {
      }
    );
  }

  $scope.withoutWorker = function () {
   // Run "doWork" code
  }
}]);
