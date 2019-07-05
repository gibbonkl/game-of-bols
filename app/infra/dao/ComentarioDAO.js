const TemplateDao = require('./TemplateDao');
let PostagemDao = require("./PostagemDao");
let PostagemModel = require("../../models/schema_postagem");

class ComentarioDAO extends TemplateDao{

    /*
        *   Salva um comentario no banco de dados
        *   @param {String} Id Postagem 
        *   @param {Object} comentario para salvar no banco
        *   @returns {object} comentario
    */
    insertComentario(idPostagem, comentario){
        PostagemDao = new PostagemDao(PostagemModel);
        if(comentario && idPostagem){
            return this._save(comentario)
                .then((res, err) => {
                    try{
                        PostagemDao.adicionaComentario(idPostagem, res._id);
                        return res;
                    }
                    catch
                    {
                        return 'erro';
                    }
                })
        }
    }
    /*
        *   Faz update no campo ativo mudando para false
        *   @param {String} id do comentario
        *   @param {String} id da Postagem 
        *   @returns {object} comentario
    */
    deleteComentarioById(idComentario, idPostagem){
        PostagemDao = new PostagemDao(PostagemModel);
        return this._findOneAndUpdate({_id:idComentario},{$set:{ativo:false}}, {new: true})
            .then((res,err) => {
                try{
                    PostagemDao.removeComentario(idPostagem, res._id);
                    return true;
                }
                catch
                {
                    return false;
                }
            })
    }
    /*
       *   Faz update no comentario 
       *   @param {Comentario} comentario 
       *   @returns {object} comentario
    */
    editarComentario(comentario) {
        if (comentario) {
            return this._findOneAndUpdate({ _id: comentario._id }, { $set: { corpo: comentario.corpo } }, {new: true})
                .then((res, err) => res ? res : err)
        }
    }

    /*
       *   Adiciona Like no comentario 
       *   @param {id} comentario
       *   @param {username} da sessão 
       *   @returns {true or false}
    */
    adicionaLike(id='', username='') {
        return this._findOneAndUpdate({ _id: id, likes: {$ne: username} }, { $addToSet:{ likes: username} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Remove Like no comentario 
       *   @param {id} comentario
       *   @param {username} da sessão 
       *   @returns {true or false}
    */
    removeLike(id='', username='') {
        return this._findOneAndUpdate({ _id: id, likes: {$eq: username} }, { $pull:{ likes: username} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Pega numero de Likes do comentario 
       *   @param {id} comentario
       *   @returns {numero de likes}
    */
    getLikes(id='')
    {
        return this._findOne({ _id: id, ativo: true })
            .then((res, err) => res ? res.likes.length : 'Não foi possível acessar os likes do comentario')
            .catch(() => 'error');
    }
}
module.exports = ComentarioDAO;