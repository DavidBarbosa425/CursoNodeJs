const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')

const {eAdmin} = require('../helpers/eAdmin')

router.get('/', eAdmin, (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', eAdmin, (req, res)=>{
    res.send('Pagina de posts')
})

router.get('/categorias', eAdmin, (req, res)=>{
    Categoria.find().lean().sort({date: 'desc'}).then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        res.flash('Erro ao listar categorias')
        res.redirect('/admin')
    })
    
})

router.get('/categorias/add', eAdmin, (req,res)=>{
    res.render('admin/addcategoria')
})

router.post('/categorias/nova', eAdmin, (req,res)=>{

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

router.get('/categorias/edit/:id', eAdmin, (req, res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render('admin/editcategorias', {categoria:categoria})
    }).catch((err)=>{
        req.flash('error_msg', 'Esta categoria não existe')
        res.redirect('/admin/categorias')
    })  
})

router.post('/categorias/edit', eAdmin, (req, res)=>{

    
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

router.post('/categorias/deletar', eAdmin, (req, res)=>{
    Categoria.deleteOne({_id: req.body.id}).then(()=>{
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao deletar categoria')
    })
})

router.get('/postagens', eAdmin, (req, res)=>{

    Postagem.find().lean().populate('categoria').sort({date: 'desc'}).then((postagens)=>{
        res.render('admin/postagens', {postagens: postagens})
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao listar postagens')
        res.redirect('/admin')
    })
    
})

router.get('/postagens/add', eAdmin, (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao carregar formulário')
        res.redirect('/admin')
    })
    
})

router.post('/postagens/nova', eAdmin, (req, res)=>{

        let erros = []

        if(req.body.categoria === '0') erros.push({text: "Categoria inválida, registre uma categoria" })
        if(erros.length > 0) {
            res.render('admin/addpostagem', {erros: erros})
        } else {
            const novaPostagem = {
                titulo: req.body.titulo,
                descricao: req.body.conteudo,
                conteudo: req.body.conteudo,
                categoria: req.body.categoria,
                slug: req.body.slug
            }

            new Postagem(novaPostagem).save().then(()=>{
                req.flash('success_msg', 'Postagem criada com sucesso')
                res.redirect('/admin/postagens')
            }).catch((err)=>{
                req.flash('error_msg', 'Erro ao criar postagem')
                res.redirect('/admin/postagens')
            })

        }
})

router.get('/postagens/edit/:id', eAdmin, (req, res)=>{

    Postagem.findOne({_id: req.params.id}).lean().then((postagem)=>{

        Categoria.find().lean().then((categorias)=>{

            res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})

        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao carregar categorias')
            res.redirect('admin/postagens')
        })

    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao carregar o formulário de edição')
        res.redirect('admin/postagens')
    })
    
})

router.post('/postagem/edit', eAdmin, (req, res)=>{

    Postagem.findOne({_id: req.body.id}).then((postagem)=>{

        postagem.titulo = req.body.titulo,
        postagem.slug = req.body.slug,
        postagem.descricao = req.body.descricao,
        postagem.conteudo = req.body.conteudo,
        postagem.categoria = req.body.categoria

        postagem.save().then(()=>{
            req.flash('success_msg', 'Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((err)=>{
           
            req.flash('error_msg', 'Erro ao salvar edição')
            res.redirect('/admin/postagens')
        })

    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao editar postagem' + err)
        res.redirect('/admin/postagens')
    })
})

router.get('/postagens/deletar/:id', eAdmin, (req, res)=>{
    Postagem.deleteOne({_id: req.params.id}).then(()=>{
        req.flash('success_msg', 'Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao deletar postagem'+ err)
    })
})


module.exports = router

