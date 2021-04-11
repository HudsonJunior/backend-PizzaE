
module.exports = {

    getOnlyNumbers(string){
        string = string.replace(/\D/g, '')
    
        return string
    },

    validateOnlyLetters(string){
        try{
            var regex = /^[A-Za-z ]+$/

            const result = regex.test(string)

            if(result){
                return string
            }else{
                return falsa
            }
            
        }
        catch(error){
            
            return false
        }
        
    },

    validateUser(string){
        try{
            var regex = /^[a-zA-Z0-9\\)(_\\-\\[\]]{4,}/g

                const result = regex.test(string)
        
                return result
        }
        catch(error){
            return false
        } 
    },

    validatePassword(string){
        try{
            var regex = /^[a-zA-Z0-9\\)(_\\-\\[\]]{6,}/g

            const result = regex.test(string)

            return result
        }
        catch(error){
            return false
        }
        
    }
}


