const HelpCenterController = require('../controllers/HelpCenterController');
const comentcontroller = require('../controllers/ComentarioController');
let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

module.exports = function(app)
{
    // Envia uma única Postagem
    app.get('/helpcenter/post/:id', (req,res) => {
    
        HelpCenterController.getPostagem(req)
            .then(response => res.send(response))
            .catch(err => res.send('Deu brete' + err));
    });
    
    // Lista Postagens por busca (:dados = minha-busca)
    app.get('/helpcenter/busca/:dados/:pagina', (req,res) => {
        
        HelpCenterController.listarPostagem(req, 'busca', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por data (:data = 8-7-2019)
    app.get('/helpcenter/filtrodata/:data/:pagina', (req,res) => {
        
        HelpCenterController.listarPostagem(req, 'data', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por atividade
    app.get('/helpcenter/filtroatividade/:pagina', (req,res) => {       
        
        HelpCenterController.listarPostagem(req, 'lastUpdate', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por username
    app.get('/helpcenter/filtrousername/:username/:pagina', (req,res) => {        
        
        HelpCenterController.listarPostagem(req, 'username', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    app.route('/helpcenter')
        
        //inserir postagem
        .post(sessionCheckerRedLogin, (req,res) => {
            
            HelpCenterController.insertPostagem(req)
                .then(postagem => postagem ? res.render('helpcenter') : res.send("Não foi possível inserir postagem"))
                .catch(console.error)
        })

        //editar postagem
        .put(sessionCheckerRedLogin, (req, res) => {
            
            HelpCenterController.editarPostagem(req)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível editar postagem"))
                .catch(console.error)
        })
        
        //deletar Postagem
        .delete(sessionCheckerRedLogin, (req, res) => {
            
            HelpCenterController.deletarPostagem(req.body.idpostagem)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível deletar postagem"))
                .catch(console.error)
        })

    app.route('/helpcenter/comentario')
        
        //Inserir Comentário
        .post(sessionCheckerRedLogin, (req,res) => {
            
            comentcontroller.insertComentario(req.body.idpostagem, req.body)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível inserir comentario"))
                .catch(console.error)
        })

        //Editar Comentário
        .put(sessionCheckerRedLogin, (req,res) => {
            
            comentcontroller.editarComentario(req)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível editar comentario"))
                .catch(console.error)
        })

        //Deletar Comentario
        .delete(sessionCheckerRedLogin, (req,res) => {
                
            comentcontroller.deletarComentario(req.body.idcomentario, req.body.idpostagem)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível deletar comentario"))
                .catch(console.error)
        });

    // Adiciona/Remove Like em uma postagem
    app.post('/helpcenter/like', sessionCheckerRedLogin, (req, res) => {
        
        HelpCenterController.like(req)
            .then(response => res.send(response))    
    });

    // Adiciona/Remove Like em um comentário
    app.post('/helpcenter/comentario/like', sessionCheckerRedLogin, (req, res) => {
        
        comentcontroller.like(req)                           
            .then(response => res.send(response))
    });

    // retorna numero de paginas
    app.post('/helpcenter/numerodepaginas', (req,res) => {        
        
        HelpCenterController.getPaginas(req)
            .then(res => res.send(res))
    });

}
