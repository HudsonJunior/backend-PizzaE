/* imports */

const string = require('./../Common/String')

const ClientesDao = require('../Daos/RelatorioSatisfacaoDao')

/* Global variables*/

var RelatorioSatisfacaoService
var clientesDao = new ClientesDao()
/* */

class RelatorioSatisfacaoService {
    constructor() {
        RelatorioSatisfacaoService = this
    }

    async create(ClientesModel) {
        console.log("estou no service");
        console.log(ClientesModel);
        return new Promise(async function (resolve, reject) {
            try {

                clientesDao.findOne(ClientesModel)
                    .then(result => {
                        console.log(result)
                        if(result){
                            console.log("Erro no cadastro")
                            reject()
                        }

                        else{

                            ClientesModel.password = string.validatePassword(ClientesModel.password)
                            ClientesModel.nome = string.validateOnlyLetters(ClientesModel.nome)
                            ClientesModel.endereco = string.validateOnlyLetters(ClientesModel.endereco)
                            ClientesModel.telefone = string.getOnlyNumbers(ClientesModel.telefone)

                            clientesDao.create(ClientesModel)
                                
                                .then(result => {
                                    result.cash_token = AuthValue.cash_token

                                    resolve(result)
                                })
                                .catch(error => {
                                    reject(error)
                                })

                        }
                    })
                /*
                const validarClientes = await RelatorioSatisfacaoService.validarClientes(ClientesModel.cliente)
                const validarEmail = await RelatorioSatisfacaoService.validarEmail(ClientesModel.email)
                const validarNome = await RelatorioSatisfacaoService.validarNome(ClientesModel.nome)
                const validarCpf = await RelatorioSatisfacaoService.validarCpf(ClientesModel.Cpf)
                const validarPassword = await RelatorioSatisfacaoService.validarPassword(ClientesModel.password)
                const validarTelefone = await RelatorioSatisfacaoService.validarTelefone(ClientesModel.telefone)
                const validarEndereco = await RelatorioSatisfacaoService.validarEndereco(ClientesModel.endereco)
                */
                
                //ClientesModel.cpf = validateCpf(ClientesModel.cpf)
                
            }
            catch (error) {
                reject(error)
            }
        })
    }


    getCliente(cpfClientes) {
        return new Promise(function (resolve, reject) {
            try {
                console.log("to em buscar cliente cpf eh:")
                console.log(cpfClientes)
                clientesDao.getCliente(cpfClientes)
                    .then(result => {
                        result.cash_token = AuthValue.cash_token

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

    get() {
        console.log("to no listar clientizinhos")
        return new Promise(function (resolve, reject) {
            try {

                clientesDao.list()
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

module.exports = RelatorioSatisfacaoService