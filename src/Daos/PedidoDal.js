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

        Pedido = mongoose.model('pedido', PedidoSchema);
    }

    create(PedidoModel) {
        return new Promise(function (resolve, reject) {

            const pedido = new Pedido(PedidoModel)

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

    update(PedidoModel) {
        return new Promise(function (resolve, reject) {
            try{
                let codigo = PedidoModel.Pedido

                let obj = new Object()

                obj.id = codigo

                Pedido.update(obj, PedidoModel)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(200, data)
                            
                            resolve(jsonSucess)
                        }
                        catch(error) {
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

    getList(dataPedido){
        return new Promise(function (resolve, reject) {
            let obj = new Object()
            obj.data = dataPedido
            try{
                Pedido.find(obj)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(200, data)
                            
                            resolve(jsonSucess)
                        }
                        catch(error) {
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


    getPedidoSchema() {
        const PedidoSchema = new mongoose.Schema(
            {
                produtos: {
                    type: Object,
                    required: true
                },
                formaPagamento: {
                    type: String,
                    required: true,
                },
                formaExpedicao: {
                    type: String,
                    required: true,
                },
                data: {
                    type: Date,
                    required: true,
                },
                cpfNF: {
                    type: String,
                    required: true,
                },
                observacoes: {
                    type: String,
                    required: false,
                },
                cpfCliente: {
                    type: String,
                    required: true,
                }
            },
        );

        return PedidoSchema
    }
}

module.exports = PedidoDal