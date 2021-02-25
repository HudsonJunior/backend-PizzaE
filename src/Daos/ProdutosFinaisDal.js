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
    constructor() {
        const ProdutosFinaisSchema = this.getProdutosFinaisSchema()

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
            let codigo = ProdutoModel.codigo;

            let obj = new Object()
            obj.nome = nome
            obj.codigo = codigo

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
                let codigo = ProdutoModel.codigo

                let obj = new Object();
                obj.codigo = codigo
                ProdutosFinais.update(obj, ProdutoModel).then().catch()
            }
            catch (error) {
                reject(error)
            }
        })
    }

    getProdutosFinaisSchema() {
        const ProdutoSchema = new mongoose.Schema(
            {
                codigo: {
                    type: int,
                    required: true,
                },
                nome: {
                    type: String,
                    required: true,
                    select: false,
                },
                name: {
                    type: String,
                    required: true,
                },
                last_name: {
                    type: String,
                    required: true,
                },
                cpf: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                }
            },
        );

        return ProdutoSchema
    }
}

module.exports = ProdutosFinaisDal