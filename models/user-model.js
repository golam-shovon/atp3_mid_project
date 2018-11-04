var db = require('./db');

module.exports={
	
	get: function(userId, callback){
		var sql = "select * from user where id=?";
		db.getResult(sql, [userId], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},
	get_Ar: function(userId, callback){
		var sql = "select * from article where id=?";
		db.getResult(sql, [userId], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},
	delete_Ar: function(articleId, callback){
		var sql = "DELETE FROM article where id=?";
		db.getResult(sql, [articleId], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM user";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	getAll_Ar: function(callback){
		var sql = "SELECT * FROM article";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO user values(null, ?, ?)";
		db.execute(sql, [user.username, user.password], function(success){
			callback(success);
		});
	},
	insert_Ar: function(article, callback){
		var sql = "INSERT INTO article values(null,null, ?)";
		db.execute(sql, [article.data], function(success){
			callback(success);
		});
	},
	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update_Ar: function(article, callback){
		var sql = "UPDATE article set data=? where id=?";
	
		db.execute(sql, [article.data, article.id], function(status){
			callback(status);
		});
	},
}