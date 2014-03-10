module.exports = function(app) {
	
	app.set("view options", {
		layout: "layouts/myLayout"
	});

  app.get('/webworker', function(req, res){
    res.render("web_worker", {});
  });

  app.get('/newpage', function(req, res){
    res.render("newpage", {});
  });
  
  app.get('/:page', function(req, res){
    res.render(req.params.page, {Message: "Hello", Person: "Rod"});
  });
  
  app.get('/', function(req, res){
    res.render("index", {});
  });
}