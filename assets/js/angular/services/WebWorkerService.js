'use strict';

// References:
//  https://github.com/achudars/simple-web-worker-in-AngularJS

// ?? Add a parameter to be a progress report callback function
// ?? Add a parameter that is the name of the web worker code - to make it variable

angular.module('js.journeyman').factory("VariableWebWorkerService",['$q',function($q){

  var worker;
  var progressCallback;
  var defer;

  return {
    doWork : function(myData, progress){
      if (!worker) {
        initWorker();
      }
      progressCallback = progress;
      defer = $q.defer();
      worker.postMessage(myData); // Send data to our worker.
      return defer.promise;
    },
    stopWork : function(){
      // this destroys the worker such that you cannot call it again!
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (progressCallback) {
        progressCallback('stopped');
      }

    }
  };

  function initWorker() {
    worker = new Worker('js/doWork.js');
    worker.addEventListener('message', function(e) {
      if (e.data.hasOwnProperty('progress') && progressCallback) {
        progressCallback('progress: ' + e.data.progress);
      } else {
        console.log('Worker done: ', e.data);
        defer.resolve(e.data);
      }
    }, false);
  }

}]);