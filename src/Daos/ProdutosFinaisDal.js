/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
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

    create(UserModel) {
        return new Promise(function (resolve, reject) {

            const produtosFinais = new ProdutosFinais(UserModel)

            produtosFinais.save()
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

    getProdutosFinaisSchema() {
        const UserSchema = new mongoose.Schema(
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

        return UserSchema
    }
}

module.exports = ProdutosFinaisDal