var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
mongoose.connect('localhost');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Todo Model

var Todo = mongoose.model('Todo', {
	text: String
});

//routes for api call 

app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if (err) res.send(err)
			res.json(todos);
	});
});

app.post('/api/todos', function(req, res){
	
	Todo.create({
		text: req.body.text, 
		done: false
	}, function(err, todo){
		if(err) res.send(err);

		todo.find(function(err, todos){
			if(err) res.send(err)
				res.json(todos);
		});
	});
});

app.delet('/api/todos/:tood_id', function(req, res){
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo){
		if (err) res.send(err);

		Todo.find(function(err, todos){
			if(err) res.send(err)
				res.json(todos);
		})
	})
})
app.listen(app.get('port'), function () {
	console.log('Express server is listening on port ' + app.get('port'));

})
