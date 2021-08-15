const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const { response } = require('express');

app.use(cors());

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const conn = mysql.createConnection({
    host: '192.168.1.72',
    user: 'testguy',
    password: 'root',
    port:'3306'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("Connected");
});

conn.query('CREATE DATABASE IF NOT EXISTS notas',(err)=>{
    if(err) throw err;
    console.log("Base de datos creada");
});

conn.query('USE notas',(err)=>{
    if(err) throw err;
    console.log("Usando notas");
});

conn.query('CREATE TABLE IF NOT EXISTS nota(titulo text not null, contenido text not null)',(err, result)=>{
    if(err) throw err;
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
app.get("/api",(req, res)=>{
    conn.query('SELECT * FROM nota',(err, data)=>{
        if(err) throw err;
        res.json(data);
        console.log(data);
    });
});

app.post("/send",(req, res)=>{
   const values = [req.body.title, req.body.content];
   console.log(values);

   conn.query('INSERT INTO nota values ?', [[values]], (err, response)=>{
       if(err) throw err;
       console.log(response.affectedRows);
   }) 
}
);

app.listen(3001, () =>{
    console.log("running server");
});