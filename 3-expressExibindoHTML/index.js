const express = require('express');
const app = express();




app.get('/', (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html")
})

app.get('/sobre', (req, res) => {
    res.sendFile(__dirname + "/frontend/sobre.html")
})

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/frontend/contato.html')
})

app.get('/login/:nome/:sobrenome/:id', (req, res) =>{
    res.send("Olá, " + req.params.nome + ' ' +req.params.sobrenome)
    
})




app.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000')
})
