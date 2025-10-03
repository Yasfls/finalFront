import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '../attachments'); // Pasta para anexos
 
// Inicializa o DOMPurify
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
 
// 🔐 Middleware de Sanitização de Entrada (XSS Defense)
export const sanitizeInput = (req, res, next) => {
    // Aplica sanitização em body, query e params (especialmente campos textuais)
    ['body', 'query'].forEach(key => {
        if (req[key]) {
            for (const prop in req[key]) {
                if (typeof req[key][prop] === 'string') {
                    // Remove HTML e atributos perigosos (ex: onclick)
                    req[key][prop] = DOMPurify.sanitize(req[key][prop]);
                }
            }
        }
    });
    next();
};
 
// 📁 Configuração Multer para Upload de Anexos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); 
    },
    filename: (req, file, cb) => {
        // CRÍTICO: Renomear arquivo para evitar Path Traversal e colisão
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    }
});
 
// 📁 Middleware de Upload (Limita tamanho e tipo de arquivo)
export const uploadAttachment = multer({
    storage: storage,
    limits: { 
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            // Rejeita o arquivo
            cb(new Error('Formato de arquivo não suportado. Apenas PDF, JPG ou PNG.'), false);
        }
    }
}).single('attachment'); // Campo de arquivo: 'attachment'