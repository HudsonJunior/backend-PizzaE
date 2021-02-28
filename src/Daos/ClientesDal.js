/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var Clientes = null

/* */
class ClientesDal {
    constructor() {
        const ClientesSchema = this.getClientesSchema()

        ClientesSchema.plugin(mongooseStringQuery);

        Clientes = mongoose.model('produtos_finais', ClientesSchema);
    }

    create(ClientesModel) {
        return new Promise(function (resolve, reject) {

            const clientes = new Clientes(ClientesModel)

            clientes.save()
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

    validatePrimaryKey(field, value){
        return new Promise(function(resolve,reject){

            let obj = new Object()
            obj[field] = value

            try{
                Cliente.findOne(obj,function (err,data){
                    if(err){
                        console.log(err)
                        reject()
                    }

                    if(!data){
                        resolve()
                    }
                    else{
                        reject()
                    }
                })
            }
            catch(error){
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