/* imports */

const Cpf = require('./../Common/Cpf')
const ClientesService = require('../Services/ProdutosFinaisService');
const PedidoDao = require('../Daos/PedidoDao');
/* Global variables*/

var pedidoDao = new PedidoDao();

var pedidoServices
var clienteService = new ClientesService()
/* */

class PedidoServices {
    constructor() {
        pedidoServices = this
    }

    async create(pedidoModel) {
        return new Promise(async function (resolve, reject) {
            try {

                pedidoModel.codigo = Math.random() * 10

                pedidoModel.cpfCliente = Cpf.validateCpf(pedidoModel.cpfCliente)

                pedidoModel.cpfNF = Cpf.validateCpf(pedidoModel.cpfNF)

                let validateExpedicao = await pedidoServices.validateExpedicao(pedidoModel.formaExpedicao, pedidoModel.cpfCliente)

                pedidoDao.create(pedidoModel)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })

            }
            catch (error) {
                reject(error)
            }
        })
    }

    async get(dataPedido) {
        return new Promise(async function (resolve, reject) {
            try {
                pedidoDao.get(dataPedido)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })

            }
            catch (error) {
                reject(error)
            }
        })
    }

    validateExpedicao(formaExpedicao, cpfCliente) {
        return new Promise(async function (resolve, reject) {
            try {
                if (formaExpedicao == 'entrega')
                    clienteService.existeCliente(cpfCliente)
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
            }
            catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = PedidoServices