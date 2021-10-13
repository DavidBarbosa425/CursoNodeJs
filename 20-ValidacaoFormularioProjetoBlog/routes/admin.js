const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.send('Pagina de posts')
})

router.get('/categorias',(req, res)=>{
    res.render('admin/categorias')
})

router.get('/categorias/add', (req,res)=>{
    res.render('admin/addcategoria')
})

router.post('/categorias/nova', (req,res)=>{

    let erros = []

    if(!req.body.nome) erros.push({texto: "Nome inválido"})
    if(req.body.nome.length <= 3 || req.body.nome.length >= 10) erros.push({texto: "Nome precisa conter entre 3 e 20 caracteres"})
    if(!req.body.slug) erros.push({texto: "Slug inválido"})
    if(req.body.slug.length <= 3 || req.body.slug.length >= 20) erros.push({texto: "slug precisa conter entre 3 e 20 caracteres"})

    if(erros.length > 0) {
        res.render('admin/addcategoria', {erros: erros})
        return;
    }

   const novaCategoria = {
       nome: req.body.nome,
       slug: req.body.slug
   }

   new Categoria(novaCategoria).save().then(()=>{
       req.flash('success_msg', 'Categoria salva com sucesso!')
       res.redirect('/admin/categorias')
   }).catch((err)=>{
       req.flash('erro_msg'," Erro ao salvar categoria, tente novamente")
       res.redirect('/admin')
   })
})


module.exports = router