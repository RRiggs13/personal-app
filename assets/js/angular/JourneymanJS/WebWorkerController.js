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
      $scope.progress = 'none';

  $scope.startWorker = function () {
    $scope.workerResults = [];
    $q.when($webWorker.doWork('Worker Working', makingProgress)).then(
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
  $scope.stopWorker = function () {
    $webWorker.stopWork();
  }

  function makingProgress(data) {
    $scope.safeApply(function () {
      $scope.progress = data;
    });
//    console.log('Progress: ', data);
  }

  $scope.withoutWorker = function () {
    $scope.workerResults = [];
    var results = [];
    for (var i=0; i<5; i++) {
      console.log('LOCK Iteration ' + (i+1));
      results.push('Iteration ' + (i+1));
      hardPause(1000);
    }
    $scope.workerResults = results;

    function hardPause(millis)
    {
      var date = new Date();
      var curDate = null;
      do { curDate = new Date(); }
      while(curDate-date < millis);
    }
  }

  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
}]);
