/* Imports */
const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions');
const sucessClass = require('../Models/Responses/Sucess');
const PedidoResponse = require('../Models/Responses/PedidoResponse');
const R = require('ramda')

/* Global variables*/

const Exceptions = new exceptionsClass();
const Sucess = new sucessClass();

var Pedido = null;

const PedidoSchema = new mongoose.Schema({
    produtos: {
        type: Object,
        require: true,
    },
    formaPagamento: {
        type: String,
        require: true,
    },
    formaExpedicao: {
        type: String,
        require: true,
    },
    endereco: {
        type: String,
        require: true,
    },
    data: {
        type: String,
        require: true,
    },
    hora: {
        type: String,
        require: true,
    },
    cpfCliente: {
        type: String,
        require: true,
    },
    cpfNF: {
        type: String,
        require: true,
    },
    observacoes: {
        type: String,
        require: true,
    },
    statusPedido: {
        type: String,
        require: true,
    },
    valor: {
        type: String,
        require: true,
    },
    statusPagamento: {
        type: String,
        require: true,
    },
});

PedidoSchema.plugin(mongooseStringQuery);
Pedido = mongoose.model('pedidos', PedidoSchema);
/* */
class PedidoDao {
    constructor() {}

    create(PedidoModel) {
        return new Promise(function (resolve, reject) {
            const pedido = new Pedido(PedidoModel);

            console.log('pedido: ', pedido);

            pedido
                .save()
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            PedidoResponse.Codes.OkRegister,
                            "Pedido registrado com sucesso"
                        );

                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InternalServerError,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.DbError
                        )
                    );
                });
        });
    }

    findOne(codigo) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.id = codigo;

            try {
                Pedido.findOne(obj, function (err, data) {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (!data) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    update(PedidoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let codigo = PedidoModel.Pedido;

                let obj = new Object();

                obj.id = codigo;

                Pedido.update(obj, PedidoModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(
                                200,
                                data
                            );

                            resolve(jsonSucess);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(
                                PedidoResponse.Codes.InternalServerError,
                                PedidoResponse.Messages.RegisterError,
                                PedidoResponse.Details.DbError
                            )
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getList(dataPedido) {
        return new Promise(function (resolve, reject) {
            console.log('estou no dao')
            let obj = new Object();
            obj.data = dataPedido;
            try {
                Pedido.find(obj, function(err, data){
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)){
                        resolve(data)
                    }

                    else {
                        resolve(false)
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PedidoDao;
