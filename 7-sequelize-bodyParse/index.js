const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')



// Config
    //Template Engine
    server.engine("handlebars", handlebars({defaultLayout: "main"}));
    server.set("view engine", "handlebars")

    //Body Parser
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())

    //Conexão com o Banco de Dados MySQL
    const sequelize = new Sequelize('test', 'root','Neversaydie@321', {
        host: "localhost",
        dialect: "mysql"
    });

    //Rotas
    server.get('/cad', (req, res)=>{
        res.render("formulario")
    })

    server.post('/add', (req, res)=>{
        res.send("Título: "+req.body.titulo +"<br>" + "Conteúdo: "+ req.body.conteudo)
    })





server.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000')
})
