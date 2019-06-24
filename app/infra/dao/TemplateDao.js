var Class_config = require('../../../config/config_localOUremoto');

const path = require('path');
//const ENV_FILE = path.join(__dirname, '.env');
//require('dotenv').config({ path: ENV_FILE });
//const async = require('async');
const mongoose = require('mongoose');


class TemplateDao{

    /*
        *   Salva um objeto no CosmosDB ou local 
        *   dependendo de qual arquivo é executado (index.js ou server.js)
    */
    constructor(model) {
        this._model = model
        var config = new Class_config();

        if(config.get() == 'local')
        {
            this._host = 'localhost';
            this._port = 27017;
            this._dbName = 'test';
            this._uri = `mongodb://${this._host}:${this._port}/${this._dbName}`;
            
            mongoose.connect(this._uri,{useNewUrlParser: true});
            this._db = mongoose.connection;
        }
        else if(config.get() == 'remoto')
        {
            mongoose.connect("mongodb://gob-db.documents.azure.com:10255/" + "?ssl=true&replicaSet=globaldb", {
                auth: {
                    user: "gob-db",
                    password: "4NMC2w09k4tC3dzOvTLlMDSvgZan2x44I0oq0EHBcNudnE3ZDUchSncSqfqHjUxM6wcTVpq0r7Gezct2qRckOw=="
                }
            })
                .then(() => console.log('Connection to CosmosDB successful'))
                .catch((err) => console.error(err));
            this._db = mongoose.connection;
        }
        /*
        mongoose.connect("mongodb://gob.documents.azure.com:10255/users" + "?ssl=true&replicaSet=globaldb", {
            auth: {
                user: "gob",//process.env.COSMODDB_USER,
                password: "PxadGsdwwKXIeAZz2w2Mk0EZxHXwOwF5DfhjZruXtsbV4jWwHhSi44NdpxwmIiWSUxwy08Q5ihJCuHIaE7Z1wA=="//process.env.COSMOSDB_PASSWORD
            }
        */
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