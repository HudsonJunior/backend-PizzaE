/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions');
const sucessClass = require('../Models/Responses/Sucess');
const R = require('ramda');
/* Global variables*/

const Exceptions = new exceptionsClass();
const Sucess = new sucessClass();

var ProdutosFinais = null;

const ProdutosFinaisSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    valor: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: Object,
    },
    adicionar: {
        type: Object,
    },
    peso: {
        type: String,
        required: true,
    },
    ativado: {
        type: String,
        required: true,
    },
    valor_promocional: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    inicio_promo: {
        type: String,
        required: true,
    },
    fim_promo: {
        type: String,
        required: true,
    },
});

ProdutosFinaisSchema.plugin(mongooseStringQuery);
ProdutosFinais = mongoose.model('produto_finals', ProdutosFinaisSchema);
/* */
class ProdutosFinaisDao {
    constructor() {}

    create(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            const produtosFinais = new ProdutosFinais(ProdutoModel);

            produtosFinais
                .save()
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(200, data);

                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    reject(Exceptions.generateException(500, 'erro', error));
                });
        });
    }

    findOne(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            let nome = ProdutoModel.nome;
            let codigo = ProdutoModel.id;

            let obj = new Object();
            obj.nome = nome;
            codigo ? (obj._id = codigo) : null;

            console.log('entrou 4', obj);

            try {
                ProdutosFinais.findOne(obj, function (err, data) {
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

    findOneFromID(idProduct) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj['_id'] = idProduct;

            try {
                ProdutosFinais.findOne(obj, function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data.nome);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    list() {
        return new Promise(function (resolve, reject) {
            try {
                ProdutosFinais.find({ ativado: true }, function (err, data) {
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

    update(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let codigo = ProdutoModel.id;

                let obj = new Object();
                obj._id = codigo;

                ProdutosFinais.updateOne(obj, ProdutoModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(
                                200,
                                'Produto alterado com sucesso'
                            );

                            resolve(jsonSucess);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(500, 'erro', error)
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj._id = ProdutoModel.id;

                ProdutosFinais.deleteOne(obj, ProdutoModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(
                                200,
                                data
                            );

                            resolve(jsonSucess);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(500, 'Erro', 'Erro')
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ProdutosFinaisDao;
