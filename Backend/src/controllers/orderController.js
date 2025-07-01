import { where } from "sequelize";
import db from "../models/index.js";

const Order = db.Order;
const OrderProduct = db.OrderProduct;
const Product = db.Product; // IMPORTANTE: Importar o modelo Product

// POST - addOrder (Ajustado para aceitar produtos e observacao)
const addOrder = async (req, res) => {
  const { user_id, products } = req.body;

  try {
    // Cria o pedido com o user_id e status padrão
    const order = await Order.create({ user_id: user_id, status: 'Em Preparo' });

    // Mapeia os produtos para a tabela de associação OrderProduct
    const orderProducts = products.map((item) => ({
      order_id: order.id_order,
      product_id: item.id_product, // Nome do campo correto
      quantity: item.quant, // 'quant' é o nome do campo enviado pelo frontend
      observacao: item.observacao // Inclui a observação
    }));

    await OrderProduct.bulkCreate(orderProducts); // Cria as associações em massa

    res.status(201).json({
      message: "Pedido Feito com Sucesso",
      orderId: order.id_order, // Retorna o ID do pedido criado
    });

    console.log(`Pedido feito: ${order.id_order}`);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
  }
};

// GET - getAllOrders
const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({
        // Opcional: incluir informações do usuário e produtos para a lista geral
        include: [
            {
                model: db.User, // Supondo que você quer o User aqui
                as: 'user',
                attributes: ['name', 'email'] // Selecione os atributos que você precisa
            },
            {
                model: Product,
                as: 'products',
                through: { attributes: ['quantity', 'observacao'] } // Inclui dados da tabela de associação
            }
        ]
    });
    res.status(200).send(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.message);
    res.status(500).send("Erro ao buscar pedidos.");
  }
};

// GET - getSingleOrder (Modificado para incluir produtos associados com dados da tabela de junção)
const getSingleOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findOne({
      where: { id_order: id },
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity', 'observacao'] } // Inclui campos da tabela de associação
        },
        {
            model: db.User, // Se quiser ver quem fez o pedido
            as: 'user',
            attributes: ['id_user', 'name', 'email']
        }
      ]
    });

    if (!order) {
        return res.status(404).send("Pedido não encontrado.");
    }
    res.status(200).send(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error.message);
    res.status(500).send("Erro ao buscar pedido.");
  }
};

// PUT - updateOrder (Novo controller para atualizar status)
const updateOrder = async (req, res) => {
    try {
        let id = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).send({ message: "O campo 'status' é obrigatório para atualização." });
        }

        const [updatedRows] = await Order.update({ status: status }, { where: { id_order: id } });

        if (updatedRows === 0) {
            return res.status(404).send("Pedido não encontrado.");
        }
        res.status(200).send(`Status do pedido ${id} atualizado para ${status}.`);
    } catch (error) {
        console.error("Erro ao atualizar pedido:", error.message);
        res.status(500).send("Erro ao atualizar pedido.");
    }
};


// DELETE - deleteOrder (Ajustado para remover associações primeiro)
const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
    // Primeiro, deletar todas as entradas na tabela de associação OrderProduct
    await OrderProduct.destroy({ where: { order_id: id } });
    // Depois, deletar o pedido
    await Order.destroy({ where: { id_order: id } });
    res.status(200).send(`Pedido deletado com sucesso: ${id}`);
  } catch (error) {
    console.error("Erro ao deletar pedido:", error.message);
    res.status(500).send("Erro ao deletar pedido.");
  }
};

export default {
  addOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder, // Adicionado ao export
  deleteOrder,
};