/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../Models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var Clientes = null

/* */
class ClientesDal {
    constructor() {
        const ClientesSchema = this.getClientesSchema()

        ClientesSchema.plugin(mongooseStringQuery);

        Clientes = mongoose.model('clientes', ClientesSchema);
    }

    create(ClientesModel) {
        
        return new Promise(function (resolve, reject) {

            const clientes = new Clientes(ClientesModel)

            clientes.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.clientesSucess(200, data)

                        resolve(jsonSucess)
                    }
                    catch (error) {
                        console.log(error)
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(Exceptions.clientesException(500, 'erro','erro'))
                })
                
        })
    }

    delete(ClientesModel) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.cpf = ClientesModel.cpf;

                Clientes.deleteOne(obj, ClientesModel)
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

    getCliente(cpfCliente) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.cpf = cpfCliente;
            try {
                Clientes.find(obj)
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

    list(cpfCliente) {
        return new Promise(function (resolve, reject) {

            try {
                Clientes.find({})
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

    update(ClientesModel) {
        return new Promise(function (resolve, reject) {
            try {
                let cpf = ClientesModel.cpf
                let obj = new Object();
                obj.cpf = cpf
                Clientes.update(obj, ClientesModel).then().catch()
            }
            catch (error) {
                reject(error)
            }
        })
    }



    validatePrimaryKey(field, value) {
        return new Promise(function (resolve, reject) {

            let obj = new Object()
            obj[field] = value

            try {
                Cliente.findOne(obj, function (err, data) {
                    if (err) {
                        console.log(err)
                        reject()
                    }

                    if (!data) {
                        resolve()
                    }
                    else {
                        reject()
                    }
                })
            }
            catch (error) {
                reject
            }
        })
    }

    getClientesSchema() {
        const ClientesSchema = new mongoose.Schema(
            {
                nome: {
                    type: String,
                    required: true,
                    select: true,
                },
                cpf: {
                    type: String,
                    required: true,
                    select: true,
                },
                endereco: {
                    type: String,
                    required: true,
                },
                telefone: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: false,
                },
                senha: {
                    type: String,
                    required: true,
                    select: true,
                }
            },
        );

        return ClientesSchema
    }
}

module.exports = ClientesDal