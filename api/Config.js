require('dotenv').config();

const UserRoles = {
    user: ['updateOwnPost', 'deleteOwnPost'],
    administrator: ['updateAnyPost', 'deleteAnyPost', 'updateOwnPost', 'deleteOwnPost'],  
}

class Config {
    get(param, defVal=undefined) {
        if(process.env[param]) {
            return process.env[param];
        }
        
        return defVal;
    }

    getPermissionsByRole(param){
        return UserRoles[param];
    }
}

module.exports = new Config;