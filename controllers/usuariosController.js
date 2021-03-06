/** Modulo instalado para criptografia de senha */
const bcrypt = require('bcrypt');
/** modulo instalado para manipulação de arquivos */
const fs = require('fs');
/** modulo nativo para manipulação de arquivos */
const path = require('path');
/** modulo instalado para gerar id */
const { uuid } = require('uuidv4');


/** caminho do arquivo json */
const usuariosPath = path.join('usuarios.json');
/** lê conteúdo do arquivo json */
let usuarios = fs.readFileSync(usuariosPath, { encoding: 'utf-8' });
/** converte JSON para Javascript */
usuarios = JSON.parse(usuarios);

const usuariosController = {

    cadastro: (request, response) => {
        response.render('cadastro', {titulo: 'Cadastre-se'})
    },

    salvar: (request, response) => {

        const { nome, email, senha } = request.body;
        // console.log(nome, email, senha);

        /** Usado para encriptar a senha */
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        /** Repare que a senha  */
        usuarios.push({ id: uuid(), nome, email, senha: senhaCrypt });

        /** converter o Javascript para json */
        let dadosJson = JSON.stringify(usuarios);
        /** salva json atualizado no arquivo */
        fs.writeFileSync(usuariosPath, dadosJson);

        /* redireciona para lista de serviços */
        return response.redirect('/login');

    },

    login: (request, response) => {
        response.render('login', {titulo: 'Login'})
    },

    autenticacao: (request, response) => {
        const {email, senha} = request.body;

         /** busca usuario pelo email */
         let usuarioEncontrado = usuarios.find(usuario => usuario.email == email);


         if(usuarioEncontrado && bcrypt.compareSync(senha, usuarioEncontrado.senha)) {
            /** usuario autenticado */
            /** cria a sessao e guarda informações do usuário logado*/
            request.session.usuarioLogado = usuarioEncontrado;
            // redireciona para pagina inical
            response.redirect('/')

            /** Para pegar informações do usuário na view você deve passar a session através do controller acima
             * seria assim: response.redirect('/', request.session.usuarioLogado)
             * lá na view você tem acesso a todas as informações do usuario e é só manipular da maneira que quiser.
             */
         } else {
             /** usuario nao autenticado */ 
             response.redirect('/login');
         }
    }

}

module.exports = usuariosController;