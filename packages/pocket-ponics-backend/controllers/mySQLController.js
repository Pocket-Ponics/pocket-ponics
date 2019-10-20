var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    user     : 'rohan',
    password : 'password',
    database : 'pocketponics',
    debug    :  false
});

exports.execute = (query,callback) => {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                callback(false, {rows: rows});
            } else {
                callback(true, err)
            }           
        });
        connection.on('error', function(err) {      
              throw err;
              return;     
        });
    });
}
