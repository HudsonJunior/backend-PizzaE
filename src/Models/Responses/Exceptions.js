
class Exceptions {
    constructor(){
        
    }

    generateException(code,message, details){
        const jsonObj = {
            code: code,
            message: message,
            details: details
        }

        return jsonObj
    }
}

module.exports = Exceptions