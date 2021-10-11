const Sequelize = require('sequelize');

    //Conexão com o Banco de Dados MySQL
    const sequelize = new Sequelize('postapp', 'root','Neversaydie@321', {
        host: "localhost",
        dialect: "mysql"
    });

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }