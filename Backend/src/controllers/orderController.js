import db from "../models/index.js";
const Order = db.Order;
const OrderProduct = db.OrderProduct;
const Product = db.Product; 


const addOrder = async (req, res) => {
  const { user_id, products } = req.body;

  try {
    
    const order = await Order.create({ user_id: user_id, status: 'Em Preparo' });

    
    const orderProducts = products.map((item) => ({
      order_id: order.id_order,
      product_id: item.id_product, 
      quantity: item.quant, 
      observacao: item.observacao 
    }));

    await OrderProduct.bulkCreate(orderProducts); 

    res.status(201).json({
      message: "Pedido Feito com Sucesso",
      orderId: order.id_order, 
    });

    console.log(`Pedido feito: ${order.id_order}`);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.findAll({
        include: [
            {
                model: db.User, 
                as: 'user',
                attributes: ['name', 'email'] 
            },
            {
                model: Product,
                as: 'products',
                through: { attributes: ['quantity', 'observacao'] } 
            }
        ]
    });
    res.status(200).send(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.message);
    res.status(500).send("Erro ao buscar pedidos.");
  }
};

const getSingleOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findOne({
      where: { id_order: id },
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity', 'observacao'] } 
        },
        {
            model: db.User, 
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

const deleteOrder = async (req, res) => {
  try {
    let id = req.params.id;
    await OrderProduct.destroy({ where: { order_id: id } });
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
  updateOrder,
  deleteOrder,
};