var mysql = require('mysql')

var con = mysql.createConnection({
    host: 'localhost',
    user: 'rohan',
    password: 'password'
})

exports.conTest = () => {

    con.connect(function(err) {
        if(err) throw err;
        console.log("connection successful")
    
        con.query("select * from pocketponics.user", function(err, result){
            console.log(result[1].email)
        })
    })
}
