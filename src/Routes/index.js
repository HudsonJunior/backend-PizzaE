
module.exports = function (server) {
    require('../Controllers/ProdutosFinaisController')(server)
    require('../Controllers/ItemEstoqueController')(server)
    require('../Controllers/PedidoController')(server)
    require('../Controllers/ClientesController')(server)
    require('../Controllers/MovimentacoesEstoqueController')(server)
}