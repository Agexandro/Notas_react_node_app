const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const conn = mysql.createConnection({
    host: '192.168.1.69',
    user: 'testguy',
    password: 'root',
    port: '3306'
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});

conn.query('CREATE DATABASE IF NOT EXISTS notas', (err) => {
    if (err) throw err;
    console.log("Base de datos creada");
});

conn.query('USE notas', (err) => {
    if (err) throw err;
    console.log("Usando notas");
});

conn.query('CREATE TABLE IF NOT EXISTS nota(titulo text not null, contenido text not null)', (err, result) => {
    if (err) throw err;
    console.log("Tabla creada");
});
/* 
conn.query("delete from nota where 1=1", (err, response)=>{
    if(err) throw err;
    console.log(response.affectedRows);
})
 */
/* conn.query('insert into nota values ?',[[["nota 1", "contenido 1"],["nota 2","contenido 2"]]],(err, result)=>{
    if(err) throw err;
    console.log("Se han insertado: "+ result.affectedRows+" notas");
}); */

app.get("/api", (req, res) => {
    conn.query('SELECT * FROM nota', (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get("/api/:id", (req, res) => {
    conn.query('SELECT * FROM nota where titulo = ?',[[req.params.id]],(err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.delete("/delete", (req, res) => {
    console.log(req.query.title)
    conn.query('DELETE FROM nota where titulo = ?',[req.query.title],(err, ar)=>{
        if(err) throw err;
        console.log(ar.affectedRows)
    });
    res.end();
})

app.post("/send", (req, res) => {
    const values = [req.body.title, req.body.content];

    conn.query('INSERT INTO nota values ?', [[values]], (err, response) => {
        if (err) throw err;
        console.log(response.affectedRows);
    })
}
);

app.listen(3001, () => {
    console.log("running server");
});