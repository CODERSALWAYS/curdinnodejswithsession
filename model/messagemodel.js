var pool = require('../util/dbconnection');

var dataObject ={
	userAdd: function(inputData, cb){
		var sql = "insert into users(username,emailid,mobno,password) values('"+inputData.uname+"','"+inputData.email+"',"+inputData.mob+",'"+inputData.pass+"')";
		console.log("sql query", sql);
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error, result){
					if (error) {
						cb(error, null);
					}
					else{
						cb(null, result);
					}
				});
			}
			connection.release();
		});
	},
	addMessage: function(inputData, cb){
		var sql = "insert into curd_table (message,sts) values('"+inputData.msg+"','"+inputData.sts+"')" 
		console.log("insert data ",sql);
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error,result){
					if (error) {
						cb(error , null);
					}
					else{
						cb(null, result);
					}
				});
			}
			connection.release();
		});
	},
	showMessage: function(cb){
		var sql = "select * from curd_table where sts="+0;
		console.log("showMessage", sql);
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error, result){
					if (error) {
						cb(error, null);
					}
					else{
						cb(null, result);
					}
				});
			}
			connection.release();
		});
	},
	deleteMessage: function(mid, cb){
		console.log("inputData",mid);
		var sql = "update curd_table set sts='-1' where mid="+mid;
		console.log("deleteMessages",sql);
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error, result){
					if (error) {
						cb(error, null);
					}
					else{
						cb(null, result);
					}
				});
			}
			connection.release();
		});
	},
	getUpdateId: function(mid, cb){
		var sql = "select * from curd_table where mid="+mid;
		console.log("getUpdateId", sql);
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error, result){
				if (error) {
					cb(error, null);
				}
				else{
					cb(null, result);
				}
			  });
			}
			connection.release();
		});
	},
	updateMessage: function(inputData, cb){
		var sql = "update curd_table set message='"+inputData.msg+"' where mid="+inputData.mid;
		pool.getConnection(function(error, connection){
			if (error) {
				console.log("connection error");
			}
			else{
				connection.query(sql, function(error, result){
					if (error) {
						cb(error, null);
					}
					else{
						cb(null, result);
					}
				});
			}
			connection.query();
		});
	}
}

module.exports = dataObject;