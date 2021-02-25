/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var ProdutosEstoque = null

/* */
class ProdutosEstoqueDao {
    constructor() {
        const ProdutosEstoqueSchema = this.getProdutosEstoqueSchema()

        ProdutosEstoqueSchema.plugin(mongooseStringQuery);

        ProdutosEstoque = mongoose.model('produtos_estoque', ProdutosEstoqueSchema);
    }

    create(UserModel) {
        return new Promise(function (resolve, reject) {

            const produtosEstoque = new ProdutosEstoque(UserModel)

            produtosEstoque.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateUserJsonSucess(UserResponse.Codes.OkRegister, data)

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

    getProdutosEstoqueSchema() {
        const UserSchema = new mongoose.Schema(
            {
                codigo: {
                    type: int,
                    required: true,
                },
                nome: {
                    type: String,
                    required: true,
                },
                marca: {
                    type: String,
                    required: false,
                },
                quantidade: {
                    type: int,
                    required: true,
                },
                quantidade_minima: {
                    type: int,
                    required: true,
                },
                valor_item: {
                    type: float,
                    required: true,
                },
                peso_item: {
                    type: float,
                    required: true,
                },
                data_validade: {
                    type: Date,
                    required: true,
                },
                data_fabricacao: {
                    type: Date,
                    required: true,
                },
                data_registro: {
                    type: Date,
                    required: true,
                },
                data_promo: {
                    type: Date,
                    required: true,
                },
            },
        );
    }
}

module.exports = ProdutosEstoqueDao