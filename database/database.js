const sequelize = require('sequelize')

const conn = new sequelize('GUIAPERGUNTAS', 'rodrigo', 'Banguela)&', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

//Exportanto Conexão
module.exports = conn