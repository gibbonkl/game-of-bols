module.exports = function(app)
{
    // Renderiza Pagina de Postagens
    app.get('/', (req,res) => {
        
        if (req.session.user && req.cookies.user_sid) 
            var user = {username: req.session.user.username, tipo: req.session.user.tipo,imagem: req.session.user.imagem, nome: req.session.user.nome }
        else
            var user = {username: '', tipo: '', imagem: '', nome: ''}
            
        res.render('home.ejs', {user : user});
    });
}