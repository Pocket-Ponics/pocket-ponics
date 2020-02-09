var Promise = require('bluebird')
var mysql = require('mysql')

var pool = mysql.createPool({
	connectionLimit : 100, 
	host     : process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : 'pocketponics',
	debug    :  false,
	connectTimeout: 3000000
})

exports.execute = (query,callback) => {
	pool.getConnection(function(err,connection){
		if (err) {
		  connection.release()
		  throw err
		}   
		connection.query(query,function(err,rows){
			connection.release()
			if(!err) {
				callback(false, {rows: rows})
			} else {
				callback(true, err)
			}           
		})
		connection.on('error', function(err) {      
			  throw err
			  return     
		})
	})
}

exports.executeTransaction = (statements, callback) => {
	pool.getConnection(function(err, connection) {
		if(err)
		{
			connection.release()
			throw err
		}
		else
		{
			Promise.promisifyAll(connection)

			return connection.beginTransactionAsync().then(() => {
				var queue = []
				for(var i = 0; i< statements.length; i++)
				{
					queue.push(connection.queryAsync(statements[i]))
				}
				return Promise.all(queue)
			}).then(() => {
				return connection.commitAsync().then(connection.releaseAsync()).then((result) => {
					callback(false, result)
				})
			}).catch(err => {
				return connection.rollbackAsync().then(connection.releaseAsync()).then(() => {
					callback(true, err)
				})
			})
		}
	})
}