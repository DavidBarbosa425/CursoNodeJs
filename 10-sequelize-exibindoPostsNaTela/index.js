const express = require('express');
const server = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require("./models/Post")



// Config
    //Template Engine
    server.engine("handlebars", handlebars({defaultLayout: "main"}));
    server.set("view engine", "handlebars")

    //Body Parser
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())

    server.get("/", (req, res)=> {
        Post.findAll({order:[['id','DESC']]}).then((posts)=>{
            res.render('home', {posts: posts})
        })
        
    })

    //Rotas
    server.get('/cad', (req, res)=>{
        res.render("formulario")
    })

    //Insere a postagem no banco de dados
    server.post('/add', (req, res)=>{
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(()=>{
            res.redirect('/')
        }).catch((erro)=>{
            res.send("Erro ao criar postagem" + erro)
        })
    })



server.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000')
})
