const cpf = require('cpf')
module.exports = {

    validateCpf(cpfString){
        return cpf.isValid(cpfString)
    }
}


