import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '../attachments');
 
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
 
export const sanitizeInput = (req, res, next) => {
    ['body', 'query'].forEach(key => {
        if (req[key]) {
            for (const prop in req[key]) {
                if (typeof req[key][prop] === 'string') {
                    req[key][prop] = DOMPurify.sanitize(req[key][prop]);
                }
            }
        }
    });
    next();
};
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    }
});
 
export const uploadAttachment = multer({
    storage: storage,
    limits: { 
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo não suportado. Apenas PDF, JPG ou PNG.'), false);
        }
    }
}).single('attachment');