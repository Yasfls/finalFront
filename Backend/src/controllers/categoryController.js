import { where } from "sequelize";
import db from "../models/index.js";

const Category = db.Category;
const Product = db.Product;

// POST
const addCategory = async (req, res) => {
  try {
    let info = { name: req.body.name };
    const category = await Category.create(info);
    res.status(201).send(category);
    console.log(`Categoria criada: ${category.name}`);
  } catch (error) {
    res.status(500).send("Erro ao criar categoria.");
  }
};

// GET
const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.findAll({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send("Erro ao buscar categorias.");
  }
};

// GET
const getSingleCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findOne({ where: { id_category: id } });
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send("Erro ao buscar categoria.");
  }
};

// PUT
const updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    await Category.update(req.body, { where: { id_category: id } });
    res.status(200).send(`Categoria editada com sucesso: ${id}`);
  } catch (error) {
    res.status(500).send("Erro ao editar categoria.");
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    await Category.destroy({ where: { id_category: id } });
    res.status(200).send(`Categoria deletada com sucesso: ${id}`);
  } catch (error) {
    res.status(500).send("Erro ao deletar categoria.");
  }
};

// GET
const getProductsbyCategory = async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
      where: { id_category: req.params.id },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Erro ao buscar produtos por categoria.");
  }
};

export default {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getProductsbyCategory,
};
