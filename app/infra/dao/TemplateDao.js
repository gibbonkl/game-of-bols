var Class_config = require('../../../config/config_localOUremoto');

const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });
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
            this._host = process.env.host;
            this._port = process.env.port;
            this._dbName = process.env.dbname;
            this._uri = `mongodb://${this._host}:${this._port}/${this._dbName}`;
            
            mongoose.connect(this._uri,{useNewUrlParser: true});
            this._db = mongoose.connection;
        }
        else if(config.get() == 'remoto')
        {
            mongoose.connect("mongodb+srv://gobuser:gobpass@gob-p1-mfcdq.azure.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
              
                .then(() => console.log('Connection to Atlas successful'))
                .catch((err) => console.error(err));
            this._db = mongoose.connection;
        }
        mongoose.set('useFindAndModify', false);
    }
    /*
        *   Salva um objeto no banco de dados
        *   @param {object} data Objeto para salvar no banco
        *   @returns {object}
    */
    _save(data){
        let model = new this._model(data);
        return model.save()
            .then((err,res) => err? err: res);
    }
    /*
        *   Busca documents no banco de dados
        *   @param {object} filter Filtro de opções para a busca
        *   @param {object} projection Projeção para a busca
        *   @param {object} options Opções para a busca
        *   @returns {object}
    */
    _find(filter={}, projection={}, options={}){
        return this._model
            .find(filter, projection, options)
            .lean(true)
            .exec();
    }
    /*
        *   Busca um document na base de dados
        *   @param {object} filter Filtro para a busca
        *   @param {object} projection Projeção para a busca
        *   @param {object} options Opções para a busca
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
        *   @param {object} filter Filtro para a busca
        *   @param {object} doc Novas informações do document
        *   @param {object} options Opções para a atualização
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
        *   @param {object} filter Filtro para a busca
        *   @param {object} doc Novas informações do document
        *   @param {object} options Opções para a atualização
        *   @returns {object}
    */
    _updateOne(filter={},doc={},options={}){
        return this._model
            .updateOne(filter,doc,options)
            .exec();
        
    }
    /*
        *   Busca um document na base de dados
        *   E atualiza com o novo document
        *   @note Cuidado ao atualizar e não sobrescrever o document
        *   @param {object}  filter Filtro para a busca
        *   @param {object} doc Novas informações do doc
        *   @param {object} options Opções para a atualização
        *   @returns {object}
    */
    _findOneAndUpdate(filter={},doc={},options={}){
        return this._model
            .findOneAndUpdate(filter,doc,options)
            .lean(true)
            .exec();
    }
    _countDocuments(filter={}){
        return this._model
            .countDocuments(filter)
            .exec();
    }
    _aggregate(queries){
        return this._model.aggregate(queries)
            .exec();
    }
    _count(filter){
        return this._model.find(filter)
            .countDocuments()
            .exec();
    }
}
module.exports = TemplateDao;