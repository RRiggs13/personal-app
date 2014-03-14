self.addEventListener('message', function(e) {
  var results = [e.data];
  for (var i=0; i<10; i++) {
    console.log('Iteration ' + (i+1));
    results.push('Iteration ' + (i+1));
    hardPause(1000);
    self.postMessage({progress: i});
  }
  self.postMessage(results);
}, false);

function hardPause(millis)
{
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}