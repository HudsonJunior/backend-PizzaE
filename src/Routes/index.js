
module.exports = function (server) {
    require('../Controllers/ProdutosFinaisController')(server)
    require('../Controllers/ProdutosEstoqueController')(server)
    require('../Controllers/PedidoController')(server)
    require('../Controllers/ClientesController')(server)
    require('../Controllers/RelatorioSatisfacaoController')(server)
    require('../Controllers/NFController')(server)
}