/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions');
const sucessClass = require('../Models/Responses/Sucess');
const R = require('ramda');
/* Global variables*/
const Exceptions = new exceptionsClass();
const Sucess = new sucessClass();

var Movimentacoes = null;

const movSchema = new mongoose.Schema({
    idProduto: {
        type: String,
        required: true,
    },
    nomeProduto: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    acao: {
        type: String,
        required: true,
    },
    /* usuario: {
        type: String,
        required: true,
    }, */
});

movSchema.plugin(mongooseStringQuery);
Movimentacoes = mongoose.model('movimentacoes_estoque', movSchema);
/* */
class MovimentacoesEstoqueDao {
    constructor() {}

    create(movModel) {
        return new Promise(function (resolve, reject) {
            const mov = new Movimentacoes(movModel);

            mov.save()
                .then((data) => {
                    try {
                        resolve();
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    reject();
                });
        });
    }

    find(movModel) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.idProduto = movModel.idProduto;
            obj.acao = 'remocao';
            try {
                Movimentacoes.findOne(obj, function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    list(data) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.data = new Date(data);

            try {
                Movimentacoes.find(obj, function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = MovimentacoesEstoqueDao;
