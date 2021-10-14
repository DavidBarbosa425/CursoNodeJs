// Carregando Frameworks
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
require('./models/Postagem')
const Postagem = mongoose.model('postagens')

//configurações
    //session
        app.use(session({
            secret: 'cursonode',
            resave: true,
            saveUninitialized: true
        }))

    //flash
        app.use(flash())
    //middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
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

        app.use((req, res, next)=>{
            console.log('Oi, eu sou um middleware')
            next()
        })
    
//Rotas
    app.get('/', (req, res)=>{
        Postagem.find().lean().populate('categoria').sort({date: 'desc'}).then((postagens)=>{
            res.render('index', {postagens: postagens})
        }).catch((err)=>{
            res.redirect('/404')
        })
        
    })

    app.get('/404', (req, res)=>{
        res.send('Error 404!')
    })

    app.use('/admin', admin)
    
//Outros


const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Servidor rodando na url http://localhost:3000')
})
