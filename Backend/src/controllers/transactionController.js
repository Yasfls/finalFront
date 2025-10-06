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
    // Adicionado 'is_paid' para garantir que ele possa ser definido explicitamente, se necessário.
    const { type, amount, description, date, category_id, is_paid } = req.body; 
    const user_id = req.user.id; // ID do usuário do JWT (seguro)
 
    if (!['RECEITA', 'DESPESA'].includes(type) || !amount || !description || !date || !category_id) {
        return res.status(400).send("Dados inválidos ou incompletos para a transação.");
    }
    
    // 📁 Anexo (req.file contém os dados do arquivo se o uploadAttachment foi bem-sucedido)
    const attachment_file = req.file;
 
    try {
        // Incluindo is_paid, se fornecido. Se não, o defaultValue do modelo será usado.
        const transaction = await Transaction.create({
            user_id: user_id,
            type: type,
            amount: parseFloat(amount),
            description: description,
            date: new Date(date),
            is_paid: is_paid !== undefined ? is_paid : false, // Usa o valor do body ou padrão false
            category_id: parseInt(category_id),
        });
 
        // Corrigido: Se houver um arquivo, crie o Attachment linkando-o à transaction_id
        if (attachment_file) {
            await Attachment.create({
                transaction_id: transaction.id_transaction, // FK para a Transação recém-criada
                file_path: attachment_file.path,
                mimetype: attachment_file.mimetype,
            });
            // Não é mais necessário atualizar a transação, pois a FK não está mais nela.
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
 
// 💰 Implementação: Obter Saldo da Conta (incluindo todas as transações)
const getAccountBalance = async (req, res) => {
    const user_id = req.user.id;
 
    try {
        // Agora busca TODAS as transações, não apenas as pagas
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
                { model: Attachment, as: 'attachments', attributes: ['file_path', 'mimetype'] } // <-- CORRIGIDO: Alias para 'attachments'
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
                { model: Attachment, as: 'attachments', attributes: ['file_path', 'mimetype'] } // <-- CORRIGIDO: Alias para 'attachments'
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
    // Adicionado 'is_paid' na whitelist
    const { type, amount, description, date, category_id, is_paid } = req.body;
    
    // Constrói o objeto de dados a partir da whitelist
    const updateData = {};
    if (type) updateData.type = type;
    if (amount) updateData.amount = parseFloat(amount);
    if (description) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (is_paid !== undefined) updateData.is_paid = is_paid; // Permite atualizar o status de pagamento
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
        // 1. Deletar Anexos (o sequelize faria isso em cascata, mas é mais seguro fazer manualmente)
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
