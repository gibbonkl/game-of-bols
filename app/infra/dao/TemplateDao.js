
const path = require('path');
const ENV_FILE = path.join(__dirname, 'env');
require('dotenv').config({ path: ENV_FILE });
const async = require('async');
const mongoose = require('mongoose');

class TemplateDao{
    constructor(model){
        this._model = model
        this._host = process.env.host;
        this._port = process.env.port;
        this._dbName = process.env.dbname;
        this._uri = `mongodb://gob:PxadGsdwwKXIeAZz2w2Mk0EZxHXwOwF5DfhjZruXtsbV4jWwHhSi44NdpxwmIiWSUxwy08Q5ihJCuHIaE7Z1wA==@gob.documents.azure.com:10255/?ssl=true"`;
        
        mongoose.connect(this._uri,{useNewUrlParser: true});
        this._db = mongoose.connection;
    }
    /*
        *   Salva um objeto no banco de dados
        *   @params {object} data Objeto para salvar no banco
        *   @returns {object}
    */
    _save(data){
        let model = new this._model(data);
        return model.save()
            .then((err,res) => err? err: res);
    }
    /*
        *   Busca documents no banco de dados
        *   @params {object} filter Filtro de opções para a busca
        *   @params {object} projection Projeção para a busca
        *   @params {object} options Opções para a busca
        *   @returns {object}
    */
    _find(filter={}, projection={},options={}){
        return this._model
            .find(filter, projection,options)
            .exec();
    }
    /*
        *   Busca um document na base de dados
        *   @params {object} filter Filtro para a busca
        *   @params {object} projection Projeção para a busca
        *   @params {object} options Opções para a busca
        *   @returns {object}
    */
    _findOne(filter={},projection={},options={}){
        return this._model
            .findOne(filter,projection,options)
            .exec();
    }
    /*
        *   Atualiza documents na base de dados
        *   @note Cuidado ao atualizar e não sobrescrever o document
        *   @params {object} filter Filtro para a busca
        *   @params {object} doc Novas informações do document
        *   @options {object} options Opções para a atualização
        *   @returns {object}
    */
    _update(filter={},doc={},options={}){
        return this._model
            .update(filter,doc,options)
            .exec();
        
    }
    /*
        *   Atualiza um document na base de dados
        *   @note Cuidado ao atualizar e não sobrescrever o document
        *   @params {object} filter Filtro para a busca
        *   @params {object} doc Novas informações do document
        *   @options {object} options Opções para a atualização
        *   @returns {object}
    */
    _updateOne(filter={},doc={},options={}){
        return this._model
            .updateOne(filter,doc,options)
            .exec();
        
    }

}
module.exports = TemplateDao;