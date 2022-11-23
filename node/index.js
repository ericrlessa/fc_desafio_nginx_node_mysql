const express = require('express')
const app = express()
const port = 3000

createTable()
insertPeople()

const peopleSelect = `SELECT * FROM people`

app.get('/', (req,res) => {
    result = '<h1>Full Cycle</h1>'

    const connection = createConnection()
    connection.connect(function(err) {
        if (err) throw err;

        connection.query(peopleSelect, function(err, sqlResult, fields) {
            if (err) throw err;
    
            Object.keys(sqlResult).forEach(function(key) {
                var row = sqlResult[key];
                result += row.id + ' - ' + row.name + "<BR>"
            });
            res.send(result)
        })

    });
   
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function createTable(){
    execute(`CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`)
}

function insertPeople(){
    execute(`INSERT INTO people(name) values('Eric')`)
}

function execute(sql){
    const connection = createConnection()
    connection.query(sql)
    connection.end()
}

function createConnection(){
    const config = {
        host: 'db',
        user: 'root',
        password: 'root',
        database:'nodedb'
    };
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    return connection
}