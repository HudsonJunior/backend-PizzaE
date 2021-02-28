
class ProdutoNormalModel {

    constructor(data) {
        this.id = data.id || 0
        this.valor = data.valor
        this.peso = data.peso
        this.ativado = data.ativado
        this.valor_promocional = data.valor_promocional
        this.inicio_promo = data.inicio_promo
        this.fim_promo = data.fim_promo
    }
}

module.exports = ProdutoNormalModel