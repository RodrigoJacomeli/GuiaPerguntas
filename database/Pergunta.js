const { INTEGER } = require('sequelize')
const sequelize = require('sequelize')
const conn = require('./database')

const Pergunta = conn.define('QUESTS', {
    QST_ID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    QST_TITLE: {
        type: sequelize.STRING,
        allowNull: false
    },
    QST_DESCRIPTION: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({ force: false }).then(() => { })

module.exports = Pergunta
