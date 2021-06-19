const servico = (request, response, next) => {

    let { nome, preco, descricao } = request.body;

    if (nome == "" || (nome.length < 3 || nome.length > 15)  ) {
        //Retorna mensagem de erro
        response.send("Nome deve ter entre 3 e 15 caracteres !")
    } else if (preco == "" || preco <= '0') {
        //Retorna mensagem de erro
        response.send("Preço não foi preenchido ou é menor que ZERO !")

    } else if (descricao == "") {
        //Retorna mensagem de erro
        response.send("Descrição precisa ser preenchida")

    } else {
        /** Executa a proxima funcao/controller */
        next();
    }

}

module.exports = servico;

