const servico = (request, response, next) => {

    let { nome, preco, descricao } = request.body;

    if (nome == "" || (nome.length < 3 || nome.length > 15)  ) {
        console.log(nome.length)
        //Retorna mensagem de erro
        response.send("Nome deve ter entre 3 e 15 caracteres !")
    } else if (preco == "" || preco <= '0') {
        console.log(preco)
        response.send("Preço não foi preenchido ou é menor que ZERO !")
    } else if (descricao == "") {
        console.log(descricao)
        response.send("Descrição precisa ser preenchida")
    } else {
        console.log(nome.length)
        /** Executa a proxima funcao/controller */
        next();
    }

}

module.exports = servico;