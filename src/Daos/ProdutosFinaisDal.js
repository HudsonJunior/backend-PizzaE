/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var ProdutosFinais = null

/* */
class ProdutosFinaisDal {
    constructor(tipoProdruto) {
        const ProdutosFinaisSchema = tipoProduto === 'Normal' ? this.getProdutoNormalSchema() : this.getProdutoPizzaSchema

        ProdutosFinaisSchema.plugin(mongooseStringQuery);

        ProdutosFinais = mongoose.model('produtos_finais', ProdutosFinaisSchema);
    }

    create(ProdutoModel) {
        return new Promise(function (resolve, reject) {

            const produtosFinais = new ProdutosFinais(ProdutoModel)

            produtosFinais.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(200, data);

                        resolve(jsonSucess)
                    }
                    catch (error) {
                        console.log(error)
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(Exceptions.generateException(UserResponse.Codes.InternalServerError, UserResponse.Messages.RegisterError, UserResponse.Details.DbError))
                })
        })
    }

    findOne(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            let nome = ProdutoModel.nome;
            let codigo = ProdutoModel.id;

            let obj = new Object()
            obj.nome = nome
            obj.id = codigo

            try {
                ProdutosFinais.findOne(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data) {
                        resolve()
                    }
                    else {
                        reject()
                    }
                })
            }
            catch (error) {
                reject(error)
            }

        })
    }

    update(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let codigo = ProdutoModel.id

                let obj = new Object();
                obj.id = codigo
                ProdutosFinais.update(obj, ProdutoModel)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(200, data);

                            resolve(jsonSucess)
                        }
                        catch (error) {
                            console.log(error)
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(UserResponse.Codes.InternalServerError, UserResponse.Messages.RegisterError, UserResponse.Details.DbError))
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.id = ProdutoModel.id;

                ProdutosFinais.deleteOne(obj, ProdutoModel)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(200, data);

                            resolve(jsonSucess)
                        }
                        catch (error) {
                            console.log(error)
                        }

                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(500, 'Erro', 'Erro'))
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    getProdutoPizzaSchema() {
        const ProdutoSchema = new mongoose.Schema(
            {
                nome: {
                    type: String,
                    required: true,
                    select: false,
                },
                valor: {
                    type: String,
                    required: true,
                },
                ingredientes: {
                    type: String,
                    required: true,
                },
                peso: {
                    type: String,
                    required: true,
                },
                ativado: {
                    type: String,
                    required: true,
                },
                valorPromocional: {
                    type: String,
                    required: true,
                },
                inicioPromo: {
                    type: String,
                    required: true,
                },
                fimPromo: {
                    type: String,
                    required: true,
                }
            },
        );

        return ProdutoSchema
    }

    getProdutoNormalSchema() {
        const ProdutoSchema = new mongoose.Schema(
            {
                valor: {
                    type: String,
                    required: true,
                    select: false,
                },
                peso: {
                    type: String,
                    required: true,
                },
                ativado: {
                    type: String,
                    required: true,
                },
                valorPromo: {
                    type: String,
                    required: true,
                },
                inicioPromo: {
                    type: String,
                    required: true,
                },
                fimPromo: {
                    type: String,
                    required: true,
                }
            },
        );

        return ProdutoSchema
    }
}

module.exports = ProdutosFinaisDal