var pool = require('../util/dbconnection');

var dataobject ={
	usersLogin: function(inputData, cb){
		var	sql ="select * from users where emailid = '"+inputData.uname+"' and password = '"+inputData.pass+"'";
		console.log("usersLogin",sql);
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
	}
}

module.exports = dataobject;