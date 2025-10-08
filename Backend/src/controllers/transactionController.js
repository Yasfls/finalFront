import db from "../models/index.js";
import { Op } from 'sequelize';
const Transaction = db.Transaction;
const Attachment = db.Attachment; 
const Category = db.Category;
const User = db.User;

const addTransaction = async (req, res) => {
    const { type, amount, description, date, category_id, is_paid } = req.body; 
    const user_id = req.user.id;
 
    if (!['RECEITA', 'DESPESA'].includes(type) || !amount || !description || !date || !category_id) {
        return res.status(400).send("Dados inválidos ou incompletos para a transação.");
    }
    
    const attachment_file = req.file;
 
    try {
        const transaction = await Transaction.create({
            user_id: user_id,
            type: type,
            amount: parseFloat(amount),
            description: description,
            date: new Date(date),
            is_paid: is_paid !== undefined ? is_paid : false,
            category_id: parseInt(category_id),
        });
 
        if (attachment_file) {
            await Attachment.create({
                transaction_id: transaction.id_transaction,
                file_path: attachment_file.path,
                mimetype: attachment_file.mimetype,
            });
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

const getAllUserTransactions = async (req, res) => {
    const user_id = req.user.id;
    try {
        const transactions = await Transaction.findAll({
            where: { user_id: user_id },
            include: [
                { model: Category, as: 'category', attributes: ['name'] },
                { model: Attachment, as: 'attachments', attributes: ['file_path', 'mimetype'] }
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
        const transaction = await Transaction.findOne({
            where: { id_transaction: id, user_id: user_id },
            include: [
                { model: Category, as: 'category', attributes: ['name'] },
                { model: Attachment, as: 'attachments', attributes: ['file_path', 'mimetype'] }
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
 
const updateTransaction = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const { type, amount, description, date, category_id, is_paid } = req.body;
    
    const updateData = {};
    if (type) updateData.type = type;
    if (amount) updateData.amount = parseFloat(amount);
    if (description) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (is_paid !== undefined) updateData.is_paid = is_paid;
    if (category_id) updateData.category_id = parseInt(category_id);
    
    if (updateData.type && !['RECEITA', 'DESPESA'].includes(updateData.type)) {
        return res.status(400).send("Tipo de transação inválido.");
    }
 
    try {
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
 
const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    try {
        await Attachment.destroy({ where: { transaction_id: id } });

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
