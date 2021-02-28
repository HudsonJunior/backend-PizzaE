
class PizzaModel {

    constructor(data) {
        this.id = data.id || 0
        this.nome = data.valor
        this.valor = data.valor
        this.indregientes = data.indregientes
        this.peso = data.peso
        this.ativado = data.ativado
        this.valor_promocional = data.valor_promocional
        this.inicio_promo = data.inicio_promo
        this.fim_promo = data.fim_promo
    }
}

module.exports = PizzaModel