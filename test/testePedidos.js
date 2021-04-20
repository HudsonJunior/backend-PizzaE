const request = require('request');
const expect = require('chai').expect;

const baseUrl = 'http://localhost:8080';

const formaPagamentoClasse1 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'pagamento online',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '18:23:00',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 1',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const formaPagamentoClasse2 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '18:23:00',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 2',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste1 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '-01:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 1',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste2 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '00:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 2',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste3 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '01:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 3',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste4 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '22:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 4',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste5 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '23:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 5',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste6 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '24:02:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 6',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste7 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:-01:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 7',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste8 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:00:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 8',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste9 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:01:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 9',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste10 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:58:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 10',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste11 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:59:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 11',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste12 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:60:03',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 12',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste13 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:-01',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 13',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste14 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:00',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 14',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste15 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:01',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 15',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste16 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:58',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 16',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste17 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:59',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 17',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

const horarioTeste18 = {
    produtos: [
        { _id: '604ce0bb8fa8d02aef2a494a', nome: 'Calabresa P', quantidade: 1 },
    ],
    formaPagamento: 'dinheiro',
    formaExpedicao: 'entrega',
    endereco: 'Rua A, 123',
    data: '2021-04-06',
    hora: '02:03:60',
    cpfCliente: '09227240918',
    cpfNF: '',
    observacoes: 'teste 18',
    statusPedido: 'realizado',
    valor: '50',
    statusPagamento: 'nao',
};

describe('Registro de pedidos - Particionamento de equivalência', () => {
    describe('Forma de Pagamento Classe 1', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(formaPagamentoClasse1),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Não foi possível cadastrar o pedido'
                    );
                    expect(obj.details).to.equal(
                        'Método de pagamento inválido'
                    );
                    done();
                }
            );
        });
    });

    describe('Forma de Pagamento Classe 2', () => {
        it('Deverá registrar o pedido pois a forma de pagamento é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(formaPagamentoClasse2),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
});

describe('Registro de pedidos - Análise de valor limite', () => {
    describe('Horário do pedido Classe 1', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste1),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 2', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste2),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 3', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste3),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 4', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste4),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 5', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste5),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 6', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste6),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 7', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste7),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 8', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste8),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 9', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste9),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 10', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste10),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 11', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste11),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 12', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste12),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 13', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste13),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 14', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste14),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 15', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste15),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 16', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste16),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 17', () => {
        it('Deverá registrar o pedido pois o horário é válida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste17),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(201);
                    expect(obj.data).to.equal('Pedido registrado com sucesso');
                    done();
                }
            );
        });
    });
    describe('Horário do pedido Classe 18', () => {
        it('Não deverá registrar o pedido pois a forma de pagamento é inválida', (done) => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/pedido`,
                    body: JSON.stringify(horarioTeste6),
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body);
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal(
                        'Hora do registro do pedido inválido'
                    );
                    done();
                }
            );
        });
    });
});
