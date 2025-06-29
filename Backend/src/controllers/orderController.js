import { where } from "sequelize";
import db from "../models/index.js";

const Order = db.Order;
const OrderProduct = db.OrderProduct;

// POST
const addOrder = async (req, res) => {
  const { user_id, products } = req.body;

  try {
    const order = await Order.create({ user_id: user_id });

    const orderProducts = products.map((item) => ({
      order_id: order.id_order,
      product_id: item.id_product,
      quantity: item.quantity,
    }));

    await OrderProduct.bulkCreate(orderProducts);

    res.status(201).json({
      message: "Pedido Feito com Sucesso",
      orderId: order.id_order,
    });

    console.log(`Pedido feito: ${order.id_order}`);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};

// GET
const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({});
    res.status(200).send(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.message);
    res.status(500).send("Erro ao buscar pedidos.");
  }
};

// GET
const getSingleOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findOne({ where: { id_order: id } });
    res.status(200).send(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error.message);
    res.status(500).send("Erro ao buscar pedido.");
  }
};

// DELETE
const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
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
  deleteOrder,
};
