// Carregando Frameworks
const express = require('express')
const app = express()

const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const admin = require('./routes/admin')
const usuarios = require('./routes/usuarios')
const path = require('path')

const mongoose = require('mongoose')
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
// require('./models/Usuario')
// const Usuario = mongoose.model('usuarios')





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

    app.get('/postagem/:slug', (req, res)=>{
        const slug = req.params.slug
        Postagem.findOne({slug: slug}).then((postagem)=>{
            if(postagem)
             {res.render('postagem/index', {postagem: postagem})

        } else {
            req.flash('error_msg', 'Erro ao carregar página')
            res.redirect('/')
        }
        }).catch((err)=>{
            req.flash('error_msg', 'Erro interno'+err)
        })
    })

    app.get('/categorias', (req, res)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render('categorias/index', {categorias: categorias})
        }).catch((err)=>{
            req.flash('error_msg', 'Erro interno ao listar categorias')
            res.redirect('/')
        })
    })

    app.get('/categorias/:slug', (req, res)=>{
        Categoria.findOne({slug: req.params.slug}).then((categoria)=>{
            if(categoria){

                Postagem.findOne({categoria: categoria._id}).then((postagens)=>{
                    res.render('categorias/postagens', {postagens: postagens})
                }).catch((err)=>{
                    req.flash('errpr_msg', 'Erro ao carregar postagem')
                    res.redirect('/')
                })
                    
            }else{
                req.flash('error_msg', 'Erro interno ao carregar categoria')
                res.redirect('/')
            }
 
        }).catch((err)=>{
                req.flash('error_msg', 'Erro ao carregar página')
                res.redirect('/')
        })     
    })

    app.use('/admin', admin)

    app.use('/usuarios', usuarios)
    
//Outros


const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Servidor rodando na url http://localhost:3000')
})
