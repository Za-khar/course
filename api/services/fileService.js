const fs = require('fs');
const config = require('../Config');

class FileService {
    createDir({user_id}) {
        const filePath = `${config.get('FILE_PATH')}\\${user_id}`;
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({ message: 'File was created' });
                }
                else {
                    return resolve({ message: 'File already exist' });
                }
            } catch (e) {
                return reject({ message: 'File error' });
            }
        });
    }
}
    
module.exports = new FileService();