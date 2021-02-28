class ProdutoEstoqueModel {

    constructor(data) {
        this.id = data.id
        this.nome = data.nome
        this.quantidade = data.quantidade
        this.marca = data.marca
        this.itens = data.itens
        this.quantidadeMinima = data.quantidadeMinima
    }
}
module.exports = ProdutoEstoqueModel
