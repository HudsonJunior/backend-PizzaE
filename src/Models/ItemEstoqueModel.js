class ItemEstoqueModel {
    constructor(data) {
        this.id = data.id
        this.loteId = data.loteId
        this.nome = data.nome
        this.marca = data.marca
        this.valor = data.valor
        this.peso = data.peso
        this.validade = data.validade
        this.fabricacao = data.fabricacao
        this.registro = data.registro
    }
}
module.exports = ItemEstoqueModel