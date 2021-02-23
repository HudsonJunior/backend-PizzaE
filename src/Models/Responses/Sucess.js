
class Sucess {
    constructor(){
        
    }

    generateJsonSucess(code, data){
        const jsonObj = {
            code: code,
            data: data
        }
        return jsonObj
    }

    generateUserJsonSucess(code, data){
        const jsonObj = {
            code: code,
            user: data.user,
            name: data.name,
            last_name: data.last_name,
            cpf: data.cpf,
            email: data.email,
            bo_premium: false,
        }
        return jsonObj
    }
}

module.exports = Sucess