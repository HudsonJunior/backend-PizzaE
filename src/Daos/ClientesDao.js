/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../Models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/
const R = require('ramda')

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
                    console.log("Erro dentro do catch do DAO", error)
                    reject(Exceptions.clientesException(500, 'erro', 'erro'))
                })

        })
    }

    delete(cpfCliente) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.cpf = cpfCliente;


                Clientes.deleteOne(obj, function (err, data) {
                    if (err) {
                        reject(Exceptions.generateException(500, 'Erro', "Erro ao deletar Cliente!"))
                        console.log(error)
                    } else {
                        const jsonSucess = Sucess.generateJsonSucess(201, "Cliente removido com sucesso!");

                        resolve(jsonSucess)
                    }
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
                            const jsonSucess = Sucess.generateJsonSucess(201, data);
                            console.log(data)
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



    list() {
        return new Promise(function (resolve, reject) {

            try {
                Clientes.find({})
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(200, data);

                            resolve(data)
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
                Clientes.updateOne(obj, ClientesModel)
                    .then((data) => {
                        try {
                            const jsonSuccess = Sucess.generateJsonSucess(201, 'cliente alterado poha');
                            resolve(jsonSuccess)
                        }
                        catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    findOne(ClienteModel) {
        return new Promise(function (resolve, reject) {
            let cpf = ClienteModel.cpf;

            let obj = new Object()
            obj.cpf = cpf

            try {
                Clientes.findOne(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data)
                    }
                    else {
                        resolve(false)
                    }
                })
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
                    required: false,
                    select: true,
                }
            },
        );

        return ClientesSchema
    }

}

module.exports = ClientesDal