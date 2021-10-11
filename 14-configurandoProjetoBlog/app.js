// Carregando Frameworks
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
//const mongoose = require('mongoose')
const app = express()

//configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
    
//Rotas

//Outros
app.get('/', (req, res)=>{
    res.send('Olá')
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Servidor rodando na url http://localhost:3000')
})
