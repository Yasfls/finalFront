import { where } from "sequelize";
import db from "../models/index.js";

const Product = db.Product;
const Category = db.Category;
const Order = db.Order;

// POST
const addProduct = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    };

    const product = await Product.create(info);
    res.status(201).send(product);
    console.log(`Produto criado: ${product.name}`);
  } catch (error) {
    console.error("Erro ao criar produto:", error.message);
    res.status(500).send("Erro ao criar produto.");
  }
};

// GET
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({});
    res.status(200).send(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).send("Erro ao buscar produtos.");
  }
};

// GET
const getSingleProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id_product: id } });
    res.status(200).send(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error.message);
    res.status(500).send("Erro ao buscar produto.");
  }
};

// PUT
const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    await Product.update(req.body, { where: { id_product: id } });
    res.status(200).send(`Produto editado com sucesso: ${id}`);
  } catch (error) {
    console.error("Erro ao editar produto:", error.message);
    res.status(500).send("Erro ao editar produto.");
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    await Product.destroy({ where: { id_product: id } });
    res.status(200).send(`Produto deletado com sucesso: ${id}`);
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    res.status(500).send("Erro ao deletar produto.");
  }
};

export default {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
