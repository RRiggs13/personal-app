// !!!! Make a Socket Service !!!!

angular.module('js.journeyman').
controller('WebSocketController', ['$scope', '$q', function ($scope, $q) {
  var websocket;

  $scope.messages = [];
  $scope.connected = false;

  $scope.connect = function () {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  $scope.disconnect = function () {
    websocket.close();
  }

  $scope.sendMessage = function () {
    doSend($scope.userMessage);
  }

  var wsUri = "ws://echo.websocket.org/";

  $scope.testSocket = function () {
    testWebSocket();
  }



  function onOpen(evt) {
    writeToScreen("CONNECTED");
    $scope.safeApply(function () {
      $scope.connected = true;
    });
  }

  function onClose(evt) {
    writeToScreen("DISCONNECTED");
    $scope.safeApply(function () {
      $scope.connected = false;
    });
  }

  function onMessage(evt) {
    writeToScreen('RESPONSE: ' + evt.data);
  }

  function onError(evt) {
    writeToScreen('ERROR: ' + evt.data);
  }






  function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpenTest(evt) };
    websocket.onclose = function(evt) { onCloseTest(evt) };
    websocket.onmessage = function(evt) { onMessageTest(evt) };
    websocket.onerror = function(evt) { onErrorTest(evt) };
  }

  function onOpenTest(evt) {
    writeToScreen("CONNECTED");
  }

  function onCloseTest(evt) {
    writeToScreen("DISCONNECTED");
  }

  function onMessageTest(evt) {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    websocket.close();
  }

  function onErrorTest(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  function doSend(message) {
    websocket.send(message);
    writeToScreen("SENT: " + message);
  }

  function writeToScreen(message) {
    $scope.safeApply(function () {
      $scope.messages.push(message);
    });
  }

//      window.addEventListener("load", init, false);

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

