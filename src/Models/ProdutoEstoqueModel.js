
class ProdutoEstoqueModel {

    constructor(data) {
        this.codigo = data.codigo
        this.nome = data.nome
        this.marca = data.marca
        this.quantidade = data.quantidade
        this.quantidade_minima = data.quantidade_minima
        this.valor_item= data.valor_item
        this.peso_item = data.peso_item
        this.data_validade = data.data_validade
        this.data_fabricacao = data.data_fabricacao
        this.data_registro = data.data_registro
        this.data_promo = data.data_promo
    }
}
module.exports = ProdutoEstoqueModel