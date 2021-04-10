/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions')
const sucessClass = require('../Models/Responses/Sucess')
const R = require('ramda')
var moment = require('moment');
const MovimentacoesEstoqueService = require('../Services/MovimentacoesEstoqueService')
const DateCommon = require('../Common/Date');
const ItemEstoqueModel = require('../Models/ItemEstoqueModel');
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()
const movService = new MovimentacoesEstoqueService()
var ItemEstoque = null

const ItemEstoqueSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        loteId: {
            type: String,
            required: false,
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
            var today = new Date();

            var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

            ItemModel.registro = date

            const itemEstoque = new ItemEstoque(ItemModel)
            itemEstoque.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(201, "Cadastro feito com sucesso")
                        
                        // registro de movimentacao do estoque
                        var today = new DateCommon().getCurrentDate();
                    
                        let movData = {
                            idProduto: data._id,
                            data: today,
                            acao: "criacao"
                        }

                        movService.create(movData);

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
            let id = ItemModel.id;

            let obj = new Object()
            obj._id = id

            try {
                ItemEstoque.findOne(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve([data])
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
                    var days = 7;
                    var date = new Date();
                    var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    date = new Date(res);
                    obj.validade = {
                        $lte : date
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
            console.log(moment(dataValidade).toDate())
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
                            //console.log(err)
                            reject(err)
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
                obj._id = id
                ItemEstoque.updateOne(obj, ItemModel)
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            200,
                            'Item do estoque alterado com sucesso'
                        );
                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(
                        Exceptions.generateException(500, 'Erro ao atualizar item estoque', error)
                    );
                });
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(codItem) {
        return new Promise(function (resolve, reject) {
            try {

                ItemEstoque.deleteOne({_id: codItem})
                .then((data) =>{
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            200,
                            'Item do estoque deletado com sucesso'
                        );
                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                        reject(Exceptions.generateException(500, "Erro ao deletar um produto Estoque")) 
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
}


module.exports = ItemEstoqueDao