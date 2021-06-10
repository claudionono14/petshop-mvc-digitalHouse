const { request } = require('express');
/** módulo instalado para manipulação de arquivos */
const fs = require('fs');
/** modulo nativo para manipulação de arquivos */
const path = require('path');
/** modulo instalado para gerar id */
const { uuid } = require('uuidv4');


/** caminho do arquivo json */
const servicosPath = path.join('servicos.json');
/** lê conteúdo do arquivo json */
let servicos = fs.readFileSync(servicosPath, { encoding: 'utf-8' });
/** converte JSON para Javascript */
servicos = JSON.parse(servicos);


const servicosController = {
    index: (request, response) => {
        /* renderiza a view adminServicos e passa informações dinamicas */
        return response.render('adminServicos', { titulo: 'Serviços', servicos });
    },
    cadastro: (request, response) => {
        /* renderiza formulario de cadastro */
        return response.render('servicosCadastro', { titulo: 'Cadastrar Serviço' });
    },
    salvar: (request, response) => {
        let { nome, descricao, preco } = request.body;

        
        /* pegando o nome do arquivo (upload) */
        let ilustracao = request.file.filename;

 
        // let ilustracao = request.file.path; Vai buscar o nome completo da imagem e causa problema no windows.

        /** adiciona o novo serviço no array */
        servicos.push({ id: uuid(), nome, descricao, preco, ilustracao });
        /** converter o Javascript para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/admin/servicos');
    },
    editar: (req, res) => {

        /**pegando parametro id da URL */
        let {id} = req.params;

        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);

        /** renderiza a view e manda titulo e objto do serviço */
        res.render('servicosEditar', {titulo: 'Editar Serviços', servico: servicoEncontrado})
    },
    atualizar: (req, res) => {
        /**pegando parametro id da URL */
        let {id} = req.params;

        /** pegando informacoes do formulario */
        let {nome, descricao, preco} = req.body;

        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);

        /** atribuir novos valores à variavel servicoEncontrado */
        servicoEncontrado.nome = nome;
        servicoEncontrado.descricao = descricao;
        servicoEncontrado.preco = preco;
        
        /** verifica se tem uma nova imagem antes de atribuir */
        if(req.file) {
            servicoEncontrado.ilustracao = req.file.filename;
        }

        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        /* redireciona para lista de serviços */
        return res.redirect('/admin/servicos');

    },
    viewExcluir: (request, response) => {

        /**pegando parametro id da URL */
        let { id } = request.params;

        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);

        /** renderiza a view e manda titulo e objto do serviço */
        response.render('servicosExcluir', {titulo: 'Servico Excluir', servico: servicoEncontrado})
    },
    excluir: (request, response) => {

         /**pegando parametro id da URL */
        let { id } = request.params;
        
        /** busca serviço pelo id */
        let servicoEncontrado = servicos.find(servico => servico.id == id);
        
        /**Removendo servico */
        servicos.splice(servicos.indexOf(servicoEncontrado), 1);

        /** converter o array para json */
        let dadosJson = JSON.stringify(servicos);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(servicosPath, dadosJson);

        return response.redirect('/admin/servicos')
    },
    show: (request, response) => {
        // console.log(request.params);
        // pegando parametro nome da rota /servicos/:nome
        const {nome} = request.params;

        return response.send(`exibindo detalhes do serviço ${nome}`);
    }
}

module.exports = servicosController;