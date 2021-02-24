const sequelize = require('sequelize')
const conn = require('./database')

const Resposta = conn.define('RESPONSES', {
    RPS_ID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    QST_ID: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    RPS_BODY: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Resposta.sync({ force: false })

module.exports = Resposta