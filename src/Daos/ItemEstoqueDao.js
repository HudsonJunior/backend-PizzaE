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

var ItemEstoque = null

const ItemEstoqueSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        valor: {
            type: String,
            required: false,
        },
        peso: {
            type: String,
            required: false,
        },
        validade: {
            type: Date,
            required: false,
        },
        fabricacao: {
            type: String,
            required: false,
        },
        registro: {
            type: String
            ,
            required: false,
        }
    }
);
ItemEstoqueSchema.plugin(mongooseStringQuery);

ItemEstoque = mongoose.model('produtos_estoque', ItemEstoqueSchema);

/* */   
class ItemEstoqueDao {

    constructor() {
    }

    create(ItemModel) {
        return new Promise(function (resolve, reject) {

            const itemEstoque = new ItemEstoque(ItemModel)

            itemEstoque.save()
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

    findOne(ItemModel) {
        return new Promise(function (resolve, reject) {
            let nome = ItemModel.nome;
            let id = ItemModel.id;

            let obj = new Object()
            obj.nome = nome
            obj.id = id

            try {
                ItemEstoque.findOne(obj, function (err, data) {
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
                ItemEstoque.find(obj, function(err, data){
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

    listAll() {
        return new Promise(function (resolve, reject) {
            try {                
                ItemEstoque.find(
                    function (err, data) {
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

    listExpiredProdutcs(dataValidade){
        return new Promise(function (resolve, reject) {
            const newData = new Date(moment(dataValidade).toDate());
            try {                
                ItemEstoque.find(
                    {
                        validade: {
                            $lte : newData
                        } 
                    }, 
                    function (err, data) {
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

    find_quantidade(nome){
        return new Promise(function(resolve, reject){
            let obj = new Object()
            obj.nome = nome

            try {
                ItemEstoque.find(obj, function (err, data) {
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

    update(ItemModel) {
        return new Promise(function (resolve, reject) {
            try {
                let id = ItemModel.id
                let obj = new Object();
                obj.id = id
                ItemEstoque.update(obj, ItemModel).then().catch()
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(codItem) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.id = codItem;

                ItemEstoque.deleteOne(obj, function (err, data) {
                    if (err) {
                        reject(Exceptions.generateException(500, 'Erro', "Erro ao deletar item do estoque!"))
                        console.log(error)
                    }else{
                        const jsonSucess = Sucess.generateJsonSucess(201, "Item apagado com sucesso!" );

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

module.exports = ItemEstoqueDao