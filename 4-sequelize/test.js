const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root','Neversaydie@321', {
    host: "localhost",
    dialect: "mysql"
});

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    } 
})

//Postagem.sync({force: true})

// Postagem.create({
//     titulo: "O que você esta pensando",
//     conteudo: "hfdasyhfnasfnaoimfmaffnmçasofnçonfhaoujsyhfdçauoyhfauçoyhfaçsuoiyuioaç"
// })

const Usuario = sequelize.define('Usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

//Usuario.sync({force: true})

// Usuario.create({
//     nome: "David",
//     sobrenome: "Barbosa",
//     idade: 34,
//     email: "davidbarbosa425@gmail.com"

// })