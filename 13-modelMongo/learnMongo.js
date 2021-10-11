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

    //Model - Usuários
    //Definindo o model
    const userSchema = mongoose.Schema({
        nome: {
            type: String,
            require: true
        },
        sobrenome: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        idade: {
            type: Number,
            require: true
        },
        pais: {
            type: String
        }
    })
    // Collection (insert into)

    mongoose.model('users', userSchema)

    const user = mongoose.model('users')

    new user({
        nome: 'Ellen',
        sobrenome: 'Cristina',
        email: 'ellen@gmail.com',
        idade: 33,
        pais: 'Brasil'
    }).save().then(()=>{
        console.log('Usuário inserido com sucesso!')
    }).catch((err)=>{
        console.log('Erro ao inserir uduário: '+err)
    })