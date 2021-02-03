require('dotenv').config();

class Config {
    get(param, defVal=undefined) {
        if(process.env[param]) {
            return process.env[param];
        }
        
        return defVal;
    }
}

module.exports = new Config;