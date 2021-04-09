module.exports = {
    Messages: {
        AlreadyRegisted: "Pedido já cadastrado",
        RegisterError: "Não foi possível cadastrar o pedido",
        CancelError: "Não foi possível cancelar o pedido",
        UpdateError: "Não foi possível alterar o pedido",
    },

    Details: {
        InvalidCode: "Código Inválido",
        DuplicatedCode: "Código duplicado",
        InvalidListProducts: "Lista de produtos inválido",
        InvalidPaymentMethod: "Método de pagamento inválido",
        InvalidShippingWay: "Forma de expedição inválida",
        InvalidCpfClient: "CPF do cliente inválido",
        InvalidClient: "Cliente inválido",
        InvalidAdress: "Endereço inválido",
        InvalidDate: "Data inválida",
        InvalidCpfNF: "CPF da Nota Fiscal inválida",
        InvalidObservations: "Observações inválida",
        InvalidOrderStatus: "Status do pedido",
        InvalidOrderValue: "Valor do pedido inválido",
        InvalidPaymentStatus: "Status do pagamento inválido",
        DbError:
            "Ocorreu um problema no banco de dados e não foi possível cadastrar o pedido",
        InvalidAttemptCancel: "Não é possível cancelar um pedido que não esteja no estado 'realizado'",
        InvalidAttemptUpdateItens: "Não é possível alterar os itens ou observações do pedido quando o pedido já está em preparo, na viagem ou já foi entregue",
        InvalidAttemptUpdatePayment: "Não é possível alterar a forma de pagamento ou a forma de expedição do pedido quando o pedido já está na viagem ou foi entregue",
    },
    Codes: {
        InvalidField: 400,
        DuplicatedPrimaryKey: 409,
        InternalServerError: 500,
        OkRegister: 201,
    },
};
