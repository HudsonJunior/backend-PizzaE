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
        carteira_trabalho: {
            type: String,
            required: false,
        },
        cep: {
            type: String,
            required: false,
        },
        endereco: {
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

Funcionario = mongoose.model('produtos_estoque', FuncionarioSchema);

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
            let nome = FuncionarioModel.nome;
            let id = FuncionarioModel.id;

            let obj = new Object()
            obj.nome = nome
            obj.id = id

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

    list(aVencer) {
        return new Promise(function (resolve, reject) {
            const obj = new Object()
            try {
                console.log(aVencer)
                if(aVencer){
                    const dataAtual = new Date()
                    let dataFormatada = ((dataAtual.getFullYear() )) + "-" + ((dataAtual.getMonth() + 1)) + "-" + (dataAtual.getDate() + 7);
                    const newData = new Date(moment(dataFormatada).toDate())
                    console.log( "newdata", newData)
                    obj.validade = {
                        $lte : newData
                    }
                }
                console.log(obj)
                Funcionario.find(obj, function(err, data){
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

    find_quantidade(nome){
        return new Promise(function(resolve, reject){
            let obj = new Object()
            obj.nome = nome

            try {
                Funcionario.find(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve({
                            nome: nome,
                            quantidade: data.length
                        })
                    }
                    else {
                        resolve({
                            nome: nome,
                            quantidade: 0
                        })
                    }
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    update(FuncionarioModel) {
        return new Promise(function (resolve, reject) {
            try {
                let id = FuncionarioModel.id
                let obj = new Object();
                obj.id = id
                Funcionario.update(obj, FuncionarioModel).then().catch()
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