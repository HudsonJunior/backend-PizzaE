/* imports */
const Cpf = require('../Common/Cpf');
const string = require('../Common/String');
const DateClass = require('../Common/Date');
const ClientesService = require('./ClientesService');
const PedidoDao = require('../Daos/PedidoDao');
const exceptionsClass = require('../Models/Responses/Exceptions');
const successClass = require('../Models/Responses/Sucess');
const PedidoResponse = require('../Models/Responses/PedidoResponse');
const Helper = require('../Common/Helper');
/* Global variables*/
const Exceptions = new exceptionsClass();
const Success = new successClass();
var pedidoService;
var pedidoDao;
/* */

class PedidoService {
    constructor() {
        pedidoService = this;
        pedidoDao = new PedidoDao();
    }

    async create(pedidoModel) {
        return new Promise(async function (resolve, reject) {
            try {
                const validatePagamento = await pedidoService.validatePagamento(
                    pedidoModel.formaPagamento
                );

                const validadeCpfClient = await pedidoService.validateCpfCliente(
                    pedidoModel.cpfCliente
                );
                const validadeCpfNF = await pedidoService.validateCpfNF(
                    pedidoModel.cpfNF
                );

                const validadeHora = await pedidoService.validateHora(
                    pedidoModel.hora
                );

                pedidoDao
                    .create(pedidoModel)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                console.log('caí', error);
                reject(error);
            }
        });
    }

    validatePagamento(formaPagamento) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(formaPagamento) &&
                    (formaPagamento == 'dinheiro' ||
                        formaPagamento == 'cartao de debito' ||
                        formaPagamento == 'cartao de credito')
                ) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidPaymentMethod
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateCpfCliente(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                if (cpf == '') {
                    resolve();
                } else if (!Cpf.validateCpf(cpf)) {
                    reject('cpf do cliente inválido');
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateCpfNF(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                if (cpf == '') {
                    resolve();
                } else if (!Cpf.validateCpf(cpf)) {
                    reject('cpf da nota fiscal inválido');
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateHora(time) {
        return new Promise(function (resolve, reject) {
            try {
                var [hr, min, sec] = time.split(':');
                var hora = parseInt(hr);
                var minutos = parseInt(min);
                var segundos = parseInt(sec);
                if (
                    hora < 0 ||
                    hora > 23 ||
                    minutos < 0 ||
                    minutos > 59 ||
                    segundos < 0 ||
                    segundos > 59
                ) {
                    reject(
                        Exceptions.generateException(
                            400,
                            'Hora do registro do pedido inválido'
                        )
                    );
                } else resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    getListFromDate(dataPedido) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListFromDate(dataPedido)
                    .then((result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido com esta data'
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getListFromClient(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListFromClient(cpf)
                    .then((result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido com este cpf'
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getListReportFromDate(dataInicio, dataFinal) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListReportFromDate(dataInicio, dataFinal)
                    .then((result) => {
                        if (result) {
                            let productsArray = new Array();

                            for (var i = 0; i < result.length; i++) {
                                var productsList = result[i]['produtos'];

                                for (var j = 0; j < productsList.length; j++) {
                                    var currentID = productsList[j]['_id'];
                                    var currentName = productsList[j]['nome'];
                                    var currentQtde =
                                        productsList[j]['quantidade'];
                                    var idAlreadyExists = Helper.fieldSearch(
                                        '_id',
                                        currentID,
                                        productsArray
                                    );

                                    if (
                                        productsArray.length === 0 ||
                                        idAlreadyExists === false
                                    ) {
                                        let obj = new Object();

                                        obj['_id'] = currentID;
                                        obj['nome'] = currentName;
                                        obj['quantidade'] = currentQtde;

                                        productsArray.push(obj);
                                    } else {
                                        productsArray[idAlreadyExists][
                                            'quantidade'
                                        ] =
                                            productsArray[idAlreadyExists][
                                            'quantidade'
                                            ] + currentQtde;
                                    }
                                }
                            }
                            resolve(productsArray);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido neste intervalo de data'
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getListFromProduct(nomeProduto) {
        return new Promise(function (resolve, reject) {
            try {
                var date = new DateClass();
                var lastMonths = date.getLastMonths(
                    date.getCurrentMonth(),
                    date.getCurrentYear(),
                    date.getCurrentPastYear()
                );
                let dataF =
                    lastMonths[0] +
                    '-' +
                    new Date(
                        date.getCurrentYear(),
                        date.getCurrentMonth(),
                        0
                    ).getDate();
                let dataI = lastMonths[5] + '-01';
                pedidoDao
                    .getListReportFromDate(dataI, dataF)
                    .then((pedidos) => {
                        if (pedidos) {
                            var productsArray = new Array();
                            var idProduto = null;

                            for (var i = 0; i < 6; i++) {
                                let obj = new Object();
                                obj['_id'] = idProduto;
                                obj['nome'] = nomeProduto;
                                obj['data'] = lastMonths[i];
                                obj['quantidade'] = 0;
                                productsArray.push(obj);
                            }

                            for (var i = 0; i < pedidos.length; i++) {
                                var productsList = pedidos[i]['produtos'];

                                for (var j = 0; j < productsList.length; j++) {
                                    if (productsList[j].nome == nomeProduto) {
                                        idProduto = productsList[j]._id;

                                        var dataPedido = pedidos[i].data
                                            .toISOString()
                                            .split('-');

                                        var mesAnoPedido =
                                            dataPedido[0] + '-' + dataPedido[1];

                                        var indexIntervalo = Helper.fieldSearch(
                                            'data',
                                            mesAnoPedido,
                                            productsArray
                                        );

                                        productsArray[
                                            indexIntervalo
                                        ].quantidade +=
                                            productsList[j].quantidade;
                                    }
                                }
                            }

                            if (idProduto) {
                                for (var i = 0; i < 6; i++) {
                                    productsArray[i]._id = idProduto;
                                }
                            } else {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Não foi encontrado nenhum pedido com este produto no intervalo de 6 meses'
                                    )
                                );
                            }

                            resolve(productsArray);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido'
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    async update(PedidoModel) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    PedidoModel.cancelar &&
                    PedidoModel.statusPedido === 'realizado'
                ) {
                    pedidoService
                        .cancelarPedido(PedidoModel)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else if (
                    PedidoModel.cancelar &&
                    PedidoModel.statusPedido !== 'realizado'
                ) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.CancelError,
                            PedidoResponse.Details.InvalidAttemptCancel
                        )
                    );
                } else {
                    pedidoDao.findOne(PedidoModel).then(pedido => {
                        if (pedido) {
                            console.log(PedidoModel.observacoes != pedido.observacoes, PedidoModel.produtos.toString() != pedido.produtos.toString())
                            if (
                                (PedidoModel.observacoes != pedido.observacoes || PedidoModel.produtos.toString() != pedido.produtos.toString()) &&
                                (PedidoModel.statusPedido === 'preparando' ||
                                    PedidoModel.statusPedido === 'viagem' || PedidoModel.statusPedido === 'entregue')
                            ) {
                                reject(
                                    Exceptions.generateException(
                                        PedidoResponse.Codes.InvalidField,
                                        PedidoResponse.Messages.UpdateError,
                                        PedidoResponse.Details.InvalidAttemptUpdateItens
                                    )
                                );
                            } else if (
                                (PedidoModel.formaPagamento != pedido.formaPagamento ||
                                    PedidoModel.formaExpedicao != pedido.formaExpedicao) &&
                                (PedidoModel.statusPedido === 'viagem' || PedidoModel.statusPedido === 'entregue')
                            ) {
                                reject(
                                    Exceptions.generateException(
                                        PedidoResponse.Codes.InvalidField,
                                        PedidoResponse.Messages.UpdateError,
                                        PedidoResponse.Details
                                            .InvalidAttemptUpdatePayment
                                    )
                                );
                            }
                            else if (
                                (PedidoModel.observacoes !=
                                    pedido.observacoes ||
                                    PedidoModel.produtos.toString() !=
                                    pedido.produtos.toString()) &&
                                (PedidoModel.statusPedido ===
                                    'preparando' ||
                                    PedidoModel.statusPedido === 'viagem' ||
                                    PedidoModel.statusPedido === 'entregue')
                            ) {
                                reject(
                                    Exceptions.generateException(
                                        PedidoResponse.Codes.InvalidField,
                                        PedidoResponse.Messages.UpdateError,
                                        PedidoResponse.Details
                                            .InvalidAttemptUpdateItens
                                    )
                                );
                            } else if (
                                (PedidoModel.formaPagamento !=
                                    pedido.formaPagamento ||
                                    PedidoModel.formaExpedicao !=
                                    pedido.formaExpedicao) &&
                                (PedidoModel.statusPedido === 'viagem' ||
                                    PedidoModel.statusPedido === 'entregue')
                            ) {
                                reject(
                                    Exceptions.generateException(
                                        PedidoResponse.Codes.InvalidField,
                                        PedidoResponse.Messages.UpdateError,
                                        PedidoResponse.Details
                                            .InvalidAttemptUpdatePayment
                                    )
                                );
                            } else {
                                pedidoDao
                                    .update(PedidoModel)
                                    .then((result) => {
                                        resolve(result);
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    });
                            }
                        } else {
                            Exceptions.generateException(
                                400,
                                'Pedido inválido',
                                'Ocorreu um problema ao editar o pedido. Pedido não encontrado'
                            );
                        }
                    }
                    )
                        .catch((error) => {
                            reject(error);
                        });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async cancelarPedido(PedidoModel) {
        return new Promise(function (resolve, reject) {
            PedidoModel.statusPedido = 'cancelado';
            pedidoDao
                .update(PedidoModel)
                .then((result) => {
                    if (result) {
                        const jsonSucess = Success.generateJsonSucess(
                            200,
                            'Pedido cancelado com sucesso'
                        );
                        resolve(jsonSucess);
                    } else reject(result);
                })
                .catch((error) => {
                    console.log('erro', error);
                    reject(error);
                });
        });
    }
}

module.exports = PedidoService;
