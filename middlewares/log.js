const fs = require('fs');

const log = (request, response, next) => {

    /**criar o arquivo log.txt, caso não exista, e adicionar mensagem no arquivo */
    fs.appendFileSync('log.txt', `O usuário acessou a url: ${request.url} \n`);
    /** executa a próxima funcão(controller) */
    next();
}

module.exports = log;