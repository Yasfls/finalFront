import db from "../models/index.js";
import { Op } from 'sequelize';
// Transação e Attachment são os novos modelos, Category e User são mantidos
const Transaction = db.Transaction;
const Attachment = db.Attachment; 
const Category = db.Category;
const User = db.User;
 
// 💰 Implementação: Adicionar Transação (Receita/Despesa)
const addTransaction = async (req, res) => {
    // 🔐 Mass Assignment Defense: Whitelist dos campos permitidos
    const { type, amount, description, date, category_id } = req.body; 
    const user_id = req.user.id; // ID do usuário do JWT (seguro)
 
    if (!['RECEITA', 'DESPESA'].includes(type) || !amount || !description || !date || !category_id) {
        return res.status(400).send("Dados inválidos para a transação.");
    }
    // 📁 Anexo
    const attachment_path = req.file ? req.file.path : null;
 
    try {
        const transaction = await Transaction.create({
            user_id: user_id,
            type: type,
            amount: parseFloat(amount),
            description: description,
            date: new Date(date),
            category_id: parseInt(category_id),
            // attachment_id será preenchido após criar o anexo
        });
 
        if (attachment_path) {
            const attachment = await Attachment.create({
                transaction_id: transaction.id_transaction,
                file_path: attachment_path,
                mimetype: req.file.mimetype,
            });
            // Atualiza a transação para linkar o anexo
            await transaction.update({ attachment_id: attachment.id_attachment });
        }
 
        res.status(201).send({
            message: `Transação (${type}) criada com sucesso.`,
            transactionId: transaction.id_transaction,
        });
        console.log(`Transação criada: ${transaction.description}`);
    } catch (error) {
        console.error("Erro ao criar transação:", error);
        res.status(500).send("Erro ao criar transação.");
    }
};
 
// 💰 Implementação: Obter Saldo da Conta
const getAccountBalance = async (req, res) => {
    const user_id = req.user.id;
 
    try {
        const transactions = await Transaction.findAll({
            where: { user_id: user_id },
            attributes: ['type', 'amount'],
        });
 
        let balance = 0;
        transactions.forEach(t => {
            if (t.type === 'RECEITA') {
                balance += parseFloat(t.amount);
            } else if (t.type === 'DESPESA') {
                balance -= parseFloat(t.amount);
            }
        });
 
        res.status(200).json({ balance: balance.toFixed(2) });
    } catch (error) {
        console.error("Erro ao calcular saldo:", error);
        res.status(500).send("Erro ao calcular saldo.");
    }
};
 
// 💰 Implementação: Obter Todas as Transações do Usuário
const getAllUserTransactions = async (req, res) => {
    const user_id = req.user.id;
    try {
        const transactions = await Transaction.findAll({
            where: { user_id: user_id },
            include: [
                { model: Category, as: 'category', attributes: ['name'] },
                { model: Attachment, as: 'attachment', attributes: ['file_path'] }
            ],
            order: [['date', 'DESC']],
        });
        res.status(200).send(transactions);
    } catch (error) {
        console.error("Erro ao buscar transações:", error.message);
        res.status(500).send("Erro ao buscar transações.");
    }
};
 
const getSingleTransaction = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    try {
        // 🔐 Adicionado: Validação de Propriedade - Garante que o usuário só acessa suas próprias transações
        const transaction = await Transaction.findOne({
            where: { id_transaction: id, user_id: user_id },
            include: [
                { model: Category, as: 'category', attributes: ['name'] },
                { model: Attachment, as: 'attachment', attributes: ['file_path'] }
            ],
        });
        if (!transaction) {
            return res.status(404).send("Transação não encontrada ou acesso negado.");
        }
        res.status(200).send(transaction);
    } catch (error) {
        res.status(500).send("Erro ao buscar transação.");
    }
};
 
// 💰 Implementação: Atualizar Transação
const updateTransaction = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    // 🔐 Mass Assignment Defense: Whitelist dos campos permitidos para atualização
    const { type, amount, description, date, category_id } = req.body;
    // Constrói o objeto de dados a partir da whitelist
    const updateData = {};
    if (type) updateData.type = type;
    if (amount) updateData.amount = parseFloat(amount);
    if (description) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (category_id) updateData.category_id = parseInt(category_id);
    // Adiciona validação de tipo de transação se presente
    if (updateData.type && !['RECEITA', 'DESPESA'].includes(updateData.type)) {
        return res.status(400).send("Tipo de transação inválido.");
    }
 
    try {
        // 🔐 Adicionado: Validação de Propriedade e Mass Assignment Protection
        const [updatedRows] = await Transaction.update(updateData, { 
            where: { 
                id_transaction: id, 
                user_id: user_id 
            } 
        });
 
        if (updatedRows === 0) {
            return res.status(404).send("Transação não encontrada ou acesso negado.");
        }
        res.status(200).send(`Transação ${id} atualizada com sucesso.`);
    } catch (error) {
        console.error("Erro ao atualizar transação:", error.message);
        res.status(500).send("Erro ao atualizar transação.");
    }
};
 
// 💰 Implementação: Deletar Transação
const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    try {
        // 1. Deletar Anexos (se houver) - (Opcional: implementar limpeza do arquivo físico)
        await Attachment.destroy({ where: { transaction_id: id } });
 
        // 2. 🔐 Adicionado: Validação de Propriedade
        const deletedRows = await Transaction.destroy({ 
            where: { 
                id_transaction: id, 
                user_id: user_id 
            } 
        });
        if (deletedRows === 0) {
            return res.status(404).send("Transação não encontrada ou acesso negado.");
        }
 
        res.status(200).send(`Transação deletada com sucesso: ${id}`);
    } catch (error) {
        console.error("Erro ao deletar transação:", error.message);
        res.status(500).send("Erro ao deletar transação.");
    }
};
 
export default {
    addTransaction,
    getAccountBalance,
    getAllUserTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction,
};