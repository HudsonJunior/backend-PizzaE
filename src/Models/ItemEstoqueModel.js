const Date = require("./../Common/Date")
const DateClass = require("./../Common/Date")
const date = new DateClass()

class ItemEstoqueModel {
    constructor(data) {
        this.id = data.id
        this.loteId = data.loteId
        this.nome = data.nome
        this.valor = data.valor
        this.peso = data.peso
        this.validade = date.converteDate(data.validade)
        this.fabricacao = data.fabricacao=="" ? null : data.fabricacao  
        this.registro = data.registro
    }
}
module.exports = ItemEstoqueModel