/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions')
const sucessClass = require('../Models/Responses/Sucess')
const R = require('ramda')
var moment = require('moment');
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var Funcionario = null

const FuncionarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        senha: {
            type: String,
            required: true,
        },
        cpf:{
            type: String,
            required: true,
        },
        rg: {
            type: String,
            required: false,
        },
        carteira: {
            type: String,
            required: false,
        },
        cep: {
            type: String,
            required: false,
        },
        rua: {
            type: String,
            required: false,
        },
        numero: {
            type: String,
            required: false,
        },
        complemento: {
            type: String,
            required: false,
        }
    }
);
FuncionarioSchema.plugin(mongooseStringQuery);

Funcionario = mongoose.model('funcionarios', FuncionarioSchema);

/* */   
class FuncionarioDao {

    constructor() {
    }

    create(FuncionarioModel) {
        return new Promise(function (resolve, reject) {

            const funcionario = new Funcionario(FuncionarioModel)

            funcionario.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(201, "Cadastro feito com sucesso")

                        resolve(jsonSucess)
                    }
                    catch (error) {
                        console.log(error)
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(Exceptions.generateException(500, "Erro ao cadastrar item no estoque"))
                })
        })
    }

    findOne(FuncionarioModel) {
        return new Promise(function (resolve, reject) {
            let cpf = FuncionarioModel.cpf;

            let obj = new Object()
            obj.cpf = cpf

            try {
                Funcionario.findOne(obj, function (err, data) {
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

    findFromCpf(FuncionarioModel) {
        return new Promise(function (resolve, reject) {
            const cpf = FuncionarioModel.cpf;
            try {
                Funcionario.find(
                    { cpf: { $regex: `.*${cpf}`}},
                    function (err, data) {
                        if (err) {
                            reject();
                        }

                        if (data != null && !R.isEmpty(data)) {
                            console.log(data);
                            resolve(data);
                        } else {
                            console.log(data);
                            resolve(false);
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }


    list() {
        return new Promise(function (resolve, reject) {
            const obj = new Object()
            try {
                Funcionario.find(function(err, data){
                    console.log("erro", err)
                    console.log("data", data)
                    if(err){
                        reject()
                    }
                    if(data != null && !R.isEmpty(data)){
                        resolve(data)
                    }
                    else{
                        resolve(false)
                    }
                })
            }
            catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }


    update(FuncionarioModel) {
        return new Promise(function (resolve, reject) {
            try {
                console.log('cpf')
                let cpf = FuncionarioModel.cpf
                let obj = new Object();
                obj.cpf = cpf
                Funcionario.updateOne(obj, FuncionarioModel)
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            200,
                            'Dados do funcionario alterado com sucesso'
                        );
                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(
                        Exceptions.generateException(500, 'Erro ao atualizar dados do funcionario', error)
                    );
                });
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.cpf = cpf;

                Funcionario.deleteOne(obj, function (err, data) {
                    if (err) {
                        reject(Exceptions.generateException(500, 'Erro', "Erro ao deletar funcionario!"))
                        console.log(error)
                    }else{
                        const jsonSucess = Sucess.generateJsonSucess(201, "Funcionario apagado com sucesso!" );

                        resolve(jsonSucess)
                    }
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = FuncionarioDao