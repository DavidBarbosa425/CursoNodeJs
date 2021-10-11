const mongoose = require('mongoose');

// Configuração mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/learnMongo', {
        useNewUrlParser: true
    }).then(()=>{
        console.log('Conectado com sucesso!')
    }).catch((err)=>{
        console.log("Erro ao se conectar: "+err)
    })