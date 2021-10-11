const express = require('express');
const app = express();




app.get('/', (req, res) => {
    res.send('Seja bem-vindo ao meu app!')
})

app.get('/sobre', (req, res) => {
    res.send('Sobre')
})

app.get('/contato', (req, res) => {
    res.send('Contato')
})

app.get('/login/:nome/:sobrenome/:id', (req, res) =>{
    res.send("Olá, " + req.params.nome + ' ' +req.params.sobrenome)
    
})




app.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000')
})
