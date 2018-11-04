var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();


router.get('*', function(request, response, next){
	
	if(request.session.un != ""){
		next();
	}else{
		response.redirect('/login');
	}
});

router.get('/', function(request, response){
	
	userModel.getAll(function(result){
		response.render('home/index');
	});
});

router.get('/article', function(request, response){
	userModel.getAll_Ar(function(result){
		response.render('home/article', {articleList: result});
	});

});

router.get('/userlist', function(request, response){
	userModel.getAll(function(result){
		response.render('home/userList', {userList: result});
	});

});

router.get('/edit/:id', function(request, response){
	
		var articleId = request.params.id;

		userModel.get_Ar(articleId, function(result){
			response.render('home/edit', {article: result});
		});

});

router.get('/delete/:id', function(request, response){
	
		var articleId = request.params.id;

		userModel.delete_Ar(articleId, function(result){
			response.render('home/delete', {article: result});
		});

});


router.post('/edit/:id', function(request, response){
	
		var article = {
			id 		: request.body.id,
			data:request.body.data

		};

		console.log(article);

		userModel.update_Ar(article, function(status){

			if(status){
				
				response.redirect(request.body.id);
			}else{
				response.send('Error');
			}
			
		});

});

router.get('/adduser', function(request, response){

	response.render('home/create');
});

router.post('/adduser', function(request, response){

	var user={
		username: request.body.username,
		password: request.body.password,
		type: request.body.type
	};

	userModel.insert(user, function(status){
		
		if(status == true){
			response.redirect('/home/userlist');
		}else{
			response.send('Error in adding user');
		}
		
	});
});
router.get('/articlepost', function(request, response){

	response.render('home/articlepost');
});
router.post('/articlepost', function(request, response){

	var article={
		data: request.body.data
	};

	userModel.insert_Ar(article, function(status){
		
		if(status == true){
			response.redirect('/home/article');
		}else{
			response.send('Error in adding article');
		}
		
	});
});

module.exports = router;