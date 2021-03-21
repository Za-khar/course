require('dotenv').config();

const UserRoles = {
    user: ['updateOwnPost', 'deleteOwnPost'],
    administrator: ['updateAnyPost', 'deleteAnyPost', 'updateOwnPost', 'deleteOwnPost'],  
};

const FileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

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

    getFileTypes() {
        return FileTypes;
    }
}

module.exports = new Config;