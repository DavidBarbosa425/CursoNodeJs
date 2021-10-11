const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')



// Config
    //Template Engine
    server.engine("handlebars", handlebars({defaultLayout: "main"}));
    server.set("view engine", "handlebars")

    //Body Parser
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())


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
