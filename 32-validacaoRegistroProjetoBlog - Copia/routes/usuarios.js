const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

//Rotas
router.get('/resgistros', (req, res)=>{
    res.render('usuarios/registro')
})

router.post('/registro', (req, res)=>{
    let erros = []

    if(!req.body.nome || !req.body.email || !req.body.senha || !req.body.senha2) {
        erros.push({texto: 'Todos os campos precisam ser preenchidos'})
    }
    if(req.body.nome.length < 3 || req.body.nome.length > 12) {
       erros.push({texto: 'Nome precisa conter entre 3 e 12 caracteres'}) 
    }
    if(req.body.senha.length < 3 || req.body.senha.length > 12){
        erros.push({texto: 'Senha precisa conter entre 3 e 12 caracters'})
    }
    if(req.body.senha !== req.body.senha2){
        erros.push({texto: 'Campo senha precisa ser igual ao campo repetir senha'}) 
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }
    else {
        res.send('hahaha')
    }
    
})

module.exports = router