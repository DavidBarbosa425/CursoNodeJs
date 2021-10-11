// Carregando Frameworks
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

//configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
    mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(()=>{
            console.log('Mongo conectado com sucesso!')
        }).catch((err)=>{
            console.log('Erro ao conectar mongo: '+err)
        })
    //Public
        app.use(express.static(path.join(__dirname, '/public')))
    
//Rotas
    app.use('/admin', admin)
//Outros


const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Servidor rodando na url http://localhost:3000')
})
