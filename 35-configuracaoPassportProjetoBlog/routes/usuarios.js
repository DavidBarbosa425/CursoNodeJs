const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

const bcrypt = require('bcryptjs')

//Rotas
router.get('/registros', (req, res)=>{
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
        Usuario.findOne({email:req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta com esse endereço de e-mail')
                res.redirect('/usuarios/resgistros')
            }
            else{
                const novoUsuario = new Usuario({
                    nome : req.body.nome,
                    email : req.body.email,
                    senha : req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash('error_msg', 'Erro interno ao cadastrar senha')
                            res.redirect('/usuarios/resgistros')
                        }
                        else{
                            novoUsuario.senha = hash

                            novoUsuario.save().then(()=>{
                                req.flash('success_msg', 'Conta criada com sucesso!')
                                res.redirect('/')
                            }).catch((err)=>{
                                req.flash('error_msg', 'Erro ao salvar usuário')
                                res.redirect('/usuarios/registros')
                            })

                        }
                    })
                })
            }
        }).catch((err)=>{
            req.flash('error_msg', 'cadastrar usuário')
            res.redirect('/')
        })
    }
    
})

router.get('/login', (req, res)=>{
    res.render('usuarios/login')
})

module.exports = router