const Date = require("./../Common/Date")
const DateClass = require("./../Common/Date")
const date = new DateClass()

class FuncionarioModel {
    constructor(data) {
        this.id = data.id
        this.nome = data.nome
        this.senha = data.senha
        this.cpf = data.cpf
        this.rg = data.rg
        this.carteira = data.carteira
        this.cep = data.cep
        this.rua = data.rua
        this.numero = data.numero
        this.complemento = data.complemento
    }
}
module.exports = FuncionarioModel