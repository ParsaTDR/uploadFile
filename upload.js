const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const uploadFile = (request, response, formFile, uploadMessage, uploadDirectory = '') => {
    if (request.method == 'POST') {
        if (!fs.existsSync(path.join(__dirname, '/uploads'))) {
            fs.mkdirSync('./uploads', { recursive: true });
        }
        const form = new formidable.IncomingForm({
            uploadDir: './uploads',
            keepExtensions: true,
            multiples: true,
            maxFileSize: 10 * 1024 * 1024,
            allowEmptyFiles: false,
        });
        form.parse(request, function (err, fields, files) {
            if (err) {
                return err.message;
            }
        });
        response.write(uploadMessage);
    } else {
        const htmlFile = fs.readFileSync(formFile, 'utf-8');
        response.write(htmlFile);
    }
};
module.exports = { uploadFile };
