/* Imports */
const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions');
const sucessClass = require('../Models/Responses/Sucess');
const PedidoResponse = require('../Models/Responses/PedidoResponse');
const R = require('ramda');

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
        type: Date,
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

            pedido
                .save()
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            201,
                            'Pedido registrado com sucesso'
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

    getListFromDate(dataPedido) {
        return new Promise(function (resolve, reject) {
            try {
                Pedido.find(
                    {
                        data: new Date(dataPedido),
                    },
                    function (err, data) {
                        if (err) {
                            reject();
                        }

                        if (data != null && !R.isEmpty(data)) {
                            resolve(data);
                        } else {
                            resolve(false);
                        }
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    getListFromClient(cpf) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.cpfCliente = cpf;

            try {
                Pedido.find(obj, function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    findOne(PedidoModel) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj._id = PedidoModel.id;

            try {
                Pedido.findOne(obj, function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    getListReportFromDate(dataI, dataF) {
        return new Promise(function (resolve, reject) {
            try {
                Pedido.find(
                    {
                        data: {
                            $gte: new Date(dataI + 'T00:00:00.000Z'),
                            $lte: new Date(dataF + 'T00:00:00.000Z'),
                        },
                    },
                    function (err, data) {
                        if (err) {
                            reject();
                        }

                        if (data != null && !R.isEmpty(data)) {
                            resolve(data);
                        } else {
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
            try {
                Pedido.find(function (err, data) {
                    if (err) {
                        reject();
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data);
                    } else {
                        resolve(false);
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
                let obj = new Object();

                obj._id = PedidoModel.id;

                Pedido.updateOne(obj, PedidoModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(
                                200,
                                'Pedido alterado com sucesso'
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
}

module.exports = PedidoDao;
