//https://www.luiztools.com.br/post/webscrapping-com-node-js/

const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
    uri: 'https://www.terra.com.br/esportes/futebol/brasileiro-serie-a/tabela/',
    transform: function (body) {
        return cheerio.load(body)
    }
}

function processarDados(dados) {
    //salva no banco de dados
    console.log(JSON.stringify(dados))
}

rp(options)
    .then(($) => {
        const times = []
        $('.zone-1').each((i, item) => {

            const time = {
                nome: $(item).find('.team-name').text(),
                posicao: parseInt($(item).find('.position').text()),
                pontos: parseInt($(item).find('.points').text())
            }

            if (time.nome !== "")
                times.push(time)
        })
        processarDados(times)
    })
    .catch((err) => {
        console.log(err);
    })