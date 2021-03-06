let sessionCheckerRedDash = require('../helper/sessionCheckerRedDash');
let captcha_render = require('../helper/recaptcha_render');
let captcha_verify = require('../helper/recaptcha_verify');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
let ValidacaoCadastro = require('../controllers/validacao_cadastro');
let controllerCadastraUsuario = require('../controllers/controller_cadastra_usuario');
const multer = require("multer");
var upload = multer({dest: 'app/public/binary'});

module.exports = function(app) {
    //middleware de validação
    app.use('/cadastro',upload.single('upload'), captcha_verify, captcha_render,(req,res,next) => {
        if (req.method == 'POST') {
            console.log('Middleware Validação Cadastro');
            let modeloUsuario = new ModeloUsuarioCadastro();
            modeloUsuario.preencheAutomatico(req.body);            
            let validacao = new ValidacaoCadastro(modeloUsuario);
            modeloUsuario = validacao.valida();            
            if (req.recaptcha.error) {
                modeloUsuario.erros.push('erro recaptcha');
                res.render('cadastro', {user : modeloUsuario.getUser(), captcha:res.recaptcha});
            } 
            else if(modeloUsuario.temErro()) {
                res.render('cadastro', {user : modeloUsuario.getUser(), captcha:res.recaptcha});
            } else {
                next();
            }
        } else {
            next();
        }
    });

    // route for user signup
    app.route('/cadastro')
        .get(sessionCheckerRedDash, captcha_render, (req, res) => {
            let modeloUsuario = new ModeloUsuarioCadastro();
            res.render('cadastro', { user : modeloUsuario.getUser(), captcha:res.recaptcha});
        })
        .post(sessionCheckerRedDash,(req, res) => {
            console.log('Rota Cadastro (metodo Post)');
            controllerCadastraUsuario(req)
            .then(retorno => {
                if (retorno.status == 'ok') {
                    req.session.user = retorno.user;   
                    res.redirect('/');                 
                } else {
                    res.render('cadastro', { user : retorno.user, captcha:res.recaptcha});
                }
            })
        });
}