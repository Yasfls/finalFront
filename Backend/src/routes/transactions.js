import express from 'express';
import multer from 'multer'; // Importação NECESSÁRIA para capturar erros específicos do Multer
import transactionController from '../controllers/transactionController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { sanitizeInput, uploadAttachment } from '../middlewares/securityMiddleware.js'; 

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Transactions
 * description: Rotas para gerenciar Receitas e Despesas (Finanças Pessoais)
 */

// POST para adicionar (usa middleware de upload e sanitização)
router.post('/add', authenticateToken, (req, res, next) => {
    // Tenta fazer o upload e captura erros de Multer (limite de tamanho/tipo)
    uploadAttachment(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Erros específicos do Multer, como arquivo muito grande (LIMIT_FILE_SIZE)
            return res.status(400).send({ message: "Erro de upload (Multer): " + err.message });
        } else if (err) {
            // Outros erros
            return res.status(400).send({ message: "Erro de upload: " + err.message });
        }
        // Se não houver erro, continua para o próximo middleware
        next();
    });
}, sanitizeInput, transactionController.addTransaction);

// GET para obter o saldo
router.get('/balance', authenticateToken, transactionController.getAccountBalance);

// GET para listar todas as transações
router.get('/all', authenticateToken, transactionController.getAllUserTransactions);

// GET para obter uma transação específica
router.get('/:id', authenticateToken, transactionController.getSingleTransaction);

// PUT para atualizar (usa sanitização)
router.put('/:id', authenticateToken, sanitizeInput, transactionController.updateTransaction);

// DELETE para deletar
router.delete('/:id', authenticateToken, transactionController.deleteTransaction);

export default router;
