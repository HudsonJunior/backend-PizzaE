const request = require('request');
const expect = require('chai').expect;

const baseUrl = 'http://localhost:8080/clientes'

const postClienteCpfCerto = { // Cadastro pra dar sucesso
    nome: "Samuekl Hiroko",
    cpf: "66040418915",
    email: "Hiro@teste.com",
    telefone: "32565689",
    endereco: "Rua Morangueira"
}

const postClienteCpfMenor = {
    nome: "Samuekl Hiroko",
    cpf: "1234567890",
    email: "Hiro@teste.com",
    telefone: "32565689",
    endereco: "Rua Morangueira"
}

const postClienteCpfMaior = {
    nome: "Samuekl Hiroko",
    cpf: "123456789012",
    email: "Hiro@teste.com",
    telefone: "32565689",
    endereco: "Rua Morangueira"
}

const postClienteCpfTamanhoCertoInvalido = {
    nome: "Samuekl Hiroko",
    cpf: "12345678901",
    email: "Hiro@teste.com",
    telefone: "32565689",
    endereco: "Rua Morangueira"
}



const postClienteEnderecoCerto = {
    nome: "Julia Karol",
    cpf: "84242864132",
    email: "julia@teste.com",
    telefone: "32565689",
    endereco: "Rua dos abacates"
}

const postClienteEnderecoMenor = {
    nome: "Julia Karol",
    cpf: "81744979430",
    email: "julia@teste.com",
    telefone: "32565689",
    endereco: "Ru"
}

const postClienteEnderecoMaior = {
    nome: "Julia Karol",
    cpf: "81744979430",
    email: "julia@teste.com",
    telefone: "32565689",
    endereco: "Rua Marechal Deodoro da Fonseca Segundo Generalzao"
}

const postClienteEnderecoMinimo = {
    nome: "Julia Karol",
    cpf: "81744979430",
    email: "julia@teste.com",
    telefone: "32565689",
    endereco: "Rua"
}

const postClienteEnderecoMaximo = {
    nome: "Julia Karol",
    cpf: "17102282451",
    email: "julia@teste.com",
    telefone: "32565689",
    endereco: "Rua Marechal Deodoro da Fonseca Segundoo"
}

describe('Gerenciar Clientes', () => {
    describe('Cadastro CPF', () => {
        it('Deveria criar um novo cliente e retornar status 201', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteCpfCerto)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;
                    expect(response.statusCode).to.equal(201);

                    expect(obj.data).to.equal('Cadastro realizado com sucesso')

                    done();
                }
            );
        });


        it('Deveria retornar erro na validacao do cpf e retornar status 500', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteCpfMenor)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(500);

                    expect(obj.message).to.equal('CPF inválido')

                    done();
                }
            );
        });

        it('Deveria retornar erro na validacao do cpf e retornar status 500', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteCpfMaior)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(500);

                    expect(obj.message).to.equal('CPF inválido')

                    done();
                }
            );
        });

        it('Deveria retornar erro na validacao do cpf e retornar status 500', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteCpfTamanhoCertoInvalido)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(500);

                    expect(obj.message).to.equal('CPF inválido')

                    done();
                }
            );
        });
    });

    describe('Cadastro Endereco', () => {
        it('Deveria criar um novo cliente e retornar status 201', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteEnderecoCerto)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(201);

                    expect(obj.data).to.equal('Cadastro realizado com sucesso')

                    done();
                }
            );
        });


        it('Deveria retornar erro na validacao do endereco e retornar status 500', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteEnderecoMenor)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(500);

                    expect(obj.message).to.equal('Endereço inválido')

                    done();
                }
            );
        });


        it('Deveria retornar erro na validacao do endereco e retornar status 500', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteEnderecoMaior)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;

                    expect(response.statusCode).to.equal(500);

                    expect(obj.message).to.equal('Endereço inválido')

                    done();
                }
            );
        });


        it('Deveria cadastrar o cliente e retornar status 201', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteEnderecoMinimo)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;
                    expect(response.statusCode).to.equal(201);

                    expect(obj.data).to.equal('Cadastro realizado com sucesso')

                    done();
                }
            );
        });

        it('Deveria cadastrar o cliente e retornar status 201', done => {
            request.post({
                headers: { 'content-type': 'application/json' },
                url: `${baseUrl}`,
                body: JSON.stringify(postClienteEnderecoMaximo)
            },
                (error, response, body) => {

                    const obj = JSON.parse(response.body);
                    postClienteCpfCerto['id'] = obj.id;
                    expect(response.statusCode).to.equal(201);

                    expect(obj.data).to.equal('Cadastro realizado com sucesso')

                    done();
                }
            );
        });

    });

});