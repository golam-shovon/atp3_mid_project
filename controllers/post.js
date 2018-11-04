var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(request, response){
	response.cookie('mycookie','IamStupid');
	userModel.getAll_Ar(function(result){
		response.render('post/index', {articleList: result});
	});

});

module.exports = router;