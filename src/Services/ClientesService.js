/* imports */

const string = require('./../Common/String')

/* Global variables*/

var clientesService

/* */

class ClientesService {
    constructor() {
        clientesService = this
    }

    async create(ClienteModel){
        return new Promise(async function(resolve,reject){
            try{

                const validarClientes = await ClientesService.validarClientes(ClientesModel.cliente)
                const validarEmail = await ClientesService.validarEmail(ClientesModel.email)
                const validarNome = await ClientesService.validarNome(ClientesModel.nome)
                const validarCpf = await ClientesService.validarCpf(ClientesModel.Cpf)
                const validarPassword = await ClientesService.validarPassword(ClientesModel.password)
                const validarTelefone = await ClientesService.validarTelefone(ClientesModel.telefone)
                const validarEndereco = await ClientesService.validarEndereco(ClientesModel.endereco)

                ClientesModel.cpf = string.getOnlyNumbers(ClientesModel.cpf)
                ClientesModel.password = await clientesService.validateNome(fullName)

                clientesServiceDal.create(ClientesModel)
                .then(result => {
                    result.cash_token = AuthValue.cash_token

                    resolve(result)
                })
                .catch(error =>{
                    reject(error)
                })
            }
            catch(error){
                reject(error)
            }
        })
    }

    validarClientes(clientes){
        return new Promise(function(resolve,reject){
            try{

                if(!string.validarClientes(clientes)){
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField,ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidClientes))
                }

                clientesService.validarPrimaryKey(ClientesValue.clientes, clientes)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(ClientesResponse.Codes.DuplicatedPrimaryKey, ClientesResponse.Messages.AlreadyRegisted, ClientesResponse.Details.DuplicatedClientes.replace(ClientesValue.clientesReplaced, clientes)))
                        
                    })                
            }  
          catch(error){
            reject(error)
          }
        })
    }

    validarEmail(email){
        return new Promise(function(resolve, reject){

            try{
                clientesService.validarPrimaryKey(ClientesValue.email, email)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(ClientesResponse.Codes.DuplicatedPrimaryKey, ClientesResponse.Messages.AlreadyRegisted, ClientesResponse.Details.DuplicatedEmail.replace(ClientesValue.emailReplaced, email)))
                })
        
            }
            catch(error){
                reject(error)
            }
        })
    }

    validarCpf(cpf){
        return new Promise(function(resolve, reject){
            try{

                if(!Cpf.validarCpf(cpf)){
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidCpf))
                }

                cpf = string.getOnlyNumbers(cpf)
                
                clientesService.validarPrimaryKey(ClientesValue.cpf, cpf)
                    .then(result => {
                        resolve()
                    })
                    .catch(error =>{
                        reject(Exceptions.generateException(ClientesResponse.Codes.DuplicatedPrimaryKey, ClientesResponse.Messages.AlreadyRegisted, ClientesResponse.Details.DuplicatedCpf.replace(ClientesValue.cpfReplaced, cpf)))

                    })
            }
            catch(error){
                reject(error)
            }
        })
    }

    validarPassword(password){
        return new Promise(function(resolve, reject){
            try{

                if(string.validarPassword(password)){
                    resolve()
                }

                else{
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidPassword))
                }
            }
            catch(error){
                reject(error)
            }
        })
    }


    validarNome(nome){
        return new Promise(function(resolve, reject){

            try{
                if(string.validarOnlyLetters(nome)){
                    resolve()
                }
                
                else{
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField,ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidName))
                }
            }

            catch(error){
                reject(error)
            }
        })
    }

    validarEndereco(endereco){
        return new Promise(function(resolve, reject){

            try{
                if(string.validarOnlyLetters(endereco)){
                    resolve()
                }
                
                else{
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField,ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidEndereco))
                }
            }

            catch(error){
                reject(error)
            }
        })
    }

    validarEndereco(telefone){
        return new Promise(function(resolve, reject){

            try{
                if(string.validarOnlyLetters(telefone)){
                    resolve()
                }
                
                else{
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField,ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidTelefone))
                }
            }

            catch(error){
                reject(error)
            }
        })
    }





}

module.exports = ClientesService