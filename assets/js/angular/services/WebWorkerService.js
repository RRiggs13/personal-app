'use strict';

// References:
//  https://github.com/achudars/simple-web-worker-in-AngularJS

// ?? Add a parameter to be a progress report callback function
// ?? Add a parameter that is the name of the web worker code - to make it variable

angular.module('js.journeyman').factory("VariableWebWorkerService",['$q',function($q){

  var worker = new Worker('js/doWork.js');
  var defer;
  worker.addEventListener('message', function(e) {
    console.log('Worker said: ', e.data);
    defer.resolve(e.data);
  }, false);

  return {
    doWork : function(myData){
      defer = $q.defer();
      worker.postMessage(myData); // Send data to our worker.
      return defer.promise;
    }
  };

}]);