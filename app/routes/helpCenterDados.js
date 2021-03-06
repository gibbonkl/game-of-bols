const HelpCenterController = require('../controllers/HelpCenterController');
const comentcontroller = require('../controllers/ComentarioController');
let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');


module.exports = function(app)
{
    app.use( (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    // Lista Postagens por busca (:dados = minha-busca)
    app.get('/helpcenter/query/:dados/:pagina', (req, res) => {

        HelpCenterController.listarPostagem(req, 'busca', req.params.pagina)
            .then(response => response?res.status(200).send(response):{erro:'Não Foi Possivel Buscar As Postagens'})
            .catch(err => console.log(err));
    });

    // Lista Postagens por data (:data = 8-7-2019)
    app.get('/helpcenter/data/:data/:pagina', (req, res) => {

        HelpCenterController.listarPostagem(req, 'data', req.params.pagina)
            .then(response => response?res.status(200).send(response):{erro:'Não Foi Possivel Buscar As Postagens'})
            .catch(err => console.log(err));
    });

    // Lista Postagens por atividade
    app.get('/helpcenter/atividade/:pagina', (req, res) => {

        HelpCenterController.listarPostagem(req, 'lastUpdate', req.params.pagina)
            .then(response => response?res.status(200).send(response):{erro:'Não Foi Possivel Buscar As Postagens'})
            .catch(err => console.log(err));
    });

    // Lista Postagens por tags
    app.get('/helpcenter/tag/:tags/:pagina', (req, res) => {

        HelpCenterController.listarPostagem(req, 'tags', req.params.pagina)
            .then(response => response?res.status(200).send(response):{erro:'Não Foi Possivel Buscar As Postagens'})
            .catch(err => console.log(err));
    });

    // Lista Postagens por username
    app.get('/helpcenter/username/:username/:pagina', (req, res) => {

        HelpCenterController.listarPostagem(req, 'username', req.params.pagina)
            .then(response => response?res.status(200).send(response):{erro:'Não Foi Possivel Buscar As Postagens'})
            .catch(err => console.log(err));
    });

    //editar postagem
    app.post('/helpcenter/editar', sessionCheckerRedLogin, (req, res) => {
        HelpCenterController.editarPostagem(req)
            .then(postagem => postagem ? res.redirect('/helpcenter') : res.send("Não foi possível editar postagem"))
            .catch(console.error)
    })

    app.route('/helpcenter')
        //inserir postagem
        .post(sessionCheckerRedLogin, (req, res) => {
            let data = {
                username: req.session.user.username,
                corpo: req.body.corpo,
                titulo: req.body.titulo,
                tags: req.body.tags.split(",")
            }
            HelpCenterController.insertPostagem(data)
                .then(postagem => postagem ? res.redirect('/helpcenter') : res.send("Não foi possível inserir postagem"))
                .catch(console.error)
        })

    //deletar Postagem
    .delete(sessionCheckerRedLogin, (req, res) => {

        HelpCenterController.deletarPostagem(req)
            .then(postagem => postagem ? res.send(postagem) : res.send({ erro: "Não foi possível deletar postagem" }))
            .catch(console.error)
    })

    app.get('/helpcenter/comments/:id', (req, res) => {

        HelpCenterController.getComentarios(req)
            .then(response => response ? res.send(response) : res.send({ erro: 'Erro ao Listar Comentários' }))
            .catch(err => console.log(err))
    });

    app.route('/helpcenter/comentario')

    //Inserir Comentário
    .post(sessionCheckerRedLogin, (req, res) => {

        comentcontroller.insertComentario(req.body.id_postagem, req.body.corpo, req.session.user.username)
            .then(comentario => comentario ? res.send(comentario) : res.send({ erro: "Não foi possível inserir comentario" }))
            .catch(err => {
                res.send({ erro: "Unexpected Error" });
                console.log(err)
            })
    })

    //Editar Comentário
    .put(sessionCheckerRedLogin, (req, res) => {

        comentcontroller.editarComentario(req)
            .then(comentario => comentario ? res.send(comentario) : res.send({ erro: "Não foi possível editar comentario" }))
            .catch(err => {
                res.send({ erro: "Unexpected Error" });
                console.log(err)
            })
    })

    //Deletar Comentario
    .delete(sessionCheckerRedLogin, (req, res) => {

        comentcontroller.deletarComentario(req)
            .then(comentario => comentario ? res.send(comentario) : res.send({ erro: "Não foi possível deletar comentario" }))
            .catch(err => {
                res.send({ erro: "Unexpected Error" });
                console.log(err)
            })
    });

    // Adiciona/Remove Like em uma postagem
    app.post('/helpcenter/like', sessionCheckerRedLogin, (req, res) => {

        HelpCenterController.like(req)
            .then(response => res ? res.send(response) : res.send({ erro: 'Não foi possivel completar a ação' }))
    });

    // Adiciona/Remove Like em um comentário
    app.post('/helpcenter/comentario/like', sessionCheckerRedLogin, (req, res) => {

        comentcontroller.like(req)
            .then(response => res ? res.send(response) : res.send({ erro: 'Não foi possivel completar a ação' }))
    });

    // Seta Resolvido em Postagem
    app.post('/helpcenter/resolvido', sessionCheckerRedLogin, (req, res) => {

        HelpCenterController.resolvido(req)
            .then(response => res ? res.send(response) : res.send({ erro: 'Não foi possivel completar a ação' }))
    });
}