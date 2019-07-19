let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
const HelpCenterController = require('../controllers/HelpCenterController');
let tags = require("../infra/dao/tagList");

module.exports = function(app) {
    // Renderiza Pagina de Postagens
    app.get('/helpCenter', (req, res) => {

        if (req.session.user && req.cookies.user_sid)
            var user = { username: req.session.user.username, tipo: req.session.user.tipo, imagem: req.session.user.imagem }
        else
            var user = { username: '', tipo: '', imagem: '' }

        res.render('helpcenter.ejs', { user: user });
    });

    // Renderiza Pagina de Inserir Postagem
    app.get('/helpCenter/novo', sessionCheckerRedLogin, (req, res) => {

        var user = { username: req.session.user.username, tipo: req.session.user.tipo, imagem: req.session.user.imagem }
        res.render('novo_topico.ejs', { user: user, tags: tags });
    });

    // Renderiza Pagina da postagem
    app.get('/helpCenter/topico/:id', (req, res) => {

        if (req.session.user && req.cookies.user_sid)
            var user = { username: req.session.user.username, tipo: req.session.user.tipo, imagem: req.session.user.imagem }
        else
            var user = { username: '', tipo: '', imagem: '' }

        HelpCenterController.getPostagem(req)
            .then(response => response ? res.render('topico.ejs', { user: user, response: response }) : res.send('Página não encontrada'))
            .catch(err => res.send('Página não encontrada'))

    });

    app.get('/helpCenter/editar/:id', sessionCheckerRedLogin, (req, res) => {

        if (req.session.user && req.cookies.user_sid)
            var user = { username: req.session.user.username, tipo: req.session.user.tipo }
        else
            var user = { username: '', tipo: '' }

        HelpCenterController.getPostagem(req)
            .then(response =>
                res.render('edita_topico.ejs', { user: user, response: response, tags: tags })
            )
            .catch(err => res.render(err))

    });
}