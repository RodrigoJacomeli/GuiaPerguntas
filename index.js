const express = require('express') // Carregando o Express
const app = express() // Instanciando Express
const bodyParser = require('body-parser')
const conn = require('./database/database') // Carregando a conexão com o MySql
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

/* Checando conexão com MySql */  
conn
    .authenticate()
    .then(() => {
        console.log("Connection Successfully!")
    })
    .catch((error) => {
        console.log(error)
    })
    
app.set('view engine', 'ejs') // Seta o EJS como motor de renderizador HTML
app.use(express.static('public')) //Seta pasta de arquivos estaticos CSS/JS/HTML
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //Ler parametros de formulario em formato JSON

/* ROTAS */
app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['QST_ID', 'DESC']
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarPergunta', (req, res) => {

    var title = req.body.titleQuest
    var description = req.body.descriptionQuest

    Pergunta.create({ // INSERT INTO
        QST_TITLE: title,
        QST_DESCRIPTION: description
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    var qst_id = req.params.id

    Pergunta.findOne({
        where: {QST_ID: qst_id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: { QST_ID: qst_id },
                order: [
                    ['QST_ID', 'DESC']
                ]}).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/salvarResposta', (req, res) => {
    var qst_id = req.body.qst_id
    var rps_body = req.body.rps_body

    Resposta.create({
        QST_ID: qst_id,
        RPS_BODY: rps_body
    }).then(() => {
        res.redirect(`/pergunta/${qst_id}`)
    })
})

app.listen(3000, () => { 
    console.log('App is running!')
})