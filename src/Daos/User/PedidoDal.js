/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../../Connection/connectionMongo');
const UserResponse = require('../../Models/Responses/UserResponse');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var Pedido = null

/* */
class PedidoDal {
    constructor() {
        const PedidoSchema = this.getPedidoSchema()

        PedidoSchema.plugin(mongooseStringQuery);

        Pedido = mongoose.model('produtos_finais', PedidoSchema);
    }

    create(UserModel) {
        return new Promise(function (resolve, reject) {

            const pedido = new Pedido(UserModel)

            pedido.save()
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

    getPedidoSchema() {
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

module.exports = PedidoDal