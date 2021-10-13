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
    Categoria.find().lean().sort({date: 'desc'}).then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        res.flash('Erro ao listar categorias')
        res.redirect('/admin')
    })
    
})

router.get('/categorias/add', (req,res)=>{
    res.render('admin/addcategoria')
})

router.post('/categorias/nova', (req,res)=>{

    let erros = []

    if(!req.body.nome) erros.push({texto: "Nome inválido"})
    if(req.body.nome.length < 3 || req.body.nome.length >= 10) erros.push({texto: "Nome precisa conter entre 3 e 20 caracteres"})
    if(!req.body.slug) erros.push({texto: "Slug inválido"})
    if(req.body.slug.length < 3 || req.body.slug.length >= 20) erros.push({texto: "slug precisa conter entre 3 e 20 caracteres"})

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

router.get('/categorias/edit/:id', (req, res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render('admin/editcategorias', {categoria:categoria})
    }).catch((err)=>{
        req.flash('error_msg', 'Esta categoria não existe')
        res.redirect('/admin/categorias')
    })  
})

router.post('/categorias/edit', (req, res)=>{

    
    Categoria.findOne({_id: req.body.id}).then((categoria)=>{

         let erros = [];

     if(!req.body.nome) erros.push({texto: "Nome inválido"})
     if(req.body.nome.length < 3 || req.body.nome.length >= 10) erros.push({texto: "Nome precisa conter entre 3 e 20 caracteres"})
     if(!req.body.slug) erros.push({texto: "Slug inválido"})
     if(req.body.slug.length < 3 || req.body.slug.length >= 20) erros.push({texto: "slug precisa conter entre 3 e 20 caracteres"})

     if(erros.length > 0) {
         
        { Categoria.findOne({ _id: req.body.id }).lean().then((categoria) => {
             res.render("admin/editcategorias", { categoria: categoria})
             req.flash("error_msg", "Verifique os valores digitados e tente novamente")
             res.redirect("/admin/categorias") 
             }).catch((err) => {
             req.flash("error_msg", "Erro ao validar os dados")
             res.redirect("/admin/categorias") 
            }) 
        }
                
     } else {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
 

            req.flash('success_msg', 'Categoria Editada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err)=>{
            req.flash('error_msg', 'erro interno ao editar categoria')
            res.redirect('/admin/categoria')
        })
     }

    }).catch((err)=>{
        req.flash('error_msg', "Erro ao editar categoria"+err)
        res.redirect('/admin/categorias')
    })
})


module.exports = router

// let erros;

//     if(!req.body.nome) erros.push({texto: "Nome inválido"})
//     if(req.body.nome.length < 3 || req.body.nome.length >= 10) erros.push({texto: "Nome precisa conter entre 3 e 20 caracteres"})
//     if(!req.body.slug) erros.push({texto: "Slug inválido"})
//     if(req.body.slug.length < 3 || req.body.slug.length >= 20) erros.push({texto: "slug precisa conter entre 3 e 20 caracteres"})

//     if(erros.length > 0) {
//         res.render('admin/editcategoria', {erros: erros})
//         return;
//     }

// router.post("/categorias/edit", (req, res) => { Categoria.findOne({ _id: req.body.id }).then((categoria) => { let erros = [] if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) { erros.push({ texto: "Nome invalido" }) } if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) { erros.push({ texto: "Slug invalido" }) } if (req.body.nome.length < 2) { erros.push({ texto: "Nome da categoria muito pequeno" }) } if (erros.length > 0) { Categoria.findOne({ _id: req.body.id }).lean().then((categoria) => { res.render("admin/editcategorias", { categoria: categoria}) }).catch((err) => { req.flash("error_msg", "Erro ao pegar os dados") res.redirect("admin/categorias") }) } else { categoria.nome = req.body.nome categoria.slug = req.body.slug categoria.save().then(() => { req.flash("success_msg", "Categoria editada com sucesso!") res.redirect("/admin/categorias") }).catch((err) => { req.flash("error_msg", "Erro ao salvar a edição da categoria") res.redirect("admin/categorias") }) } }).catch((err) => { req.flash("error_msg", "Erro ao editar a categoria") req.redirect("/admin/categorias") }) })