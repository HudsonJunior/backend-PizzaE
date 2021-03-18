
class ProdutoFinalModel {

    constructor(data) {
        this.id = data.id
        this.nome = data.nome
        this.valor = data.valor
        this.ingredientes = data.ingredientes || ''
        this.adicionais = data.adicionais || ''
        this.peso = data.peso
        this.ativado = data.ativado
        this.valor_promocional = data.valor_promocional
        this.inicio_promo = data.inicio_promo
        this.fim_promo = data.fim_promo
        this.tipo = data.tipo
    }
}

module.exports = ProdutoFinalModel