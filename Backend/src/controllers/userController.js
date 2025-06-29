import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const User = db.User;

// POST
const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let info = {
      id_user: req.body.id_user,
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    };

    const user = await User.create(info);
    res.status(201).send(user);
    console.log(`Usuário adicionado: ${user.name}`);
  } catch {
    res.status(500).send("Erro ao adicionar usuário");
  }
};

// GET
const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["id_user", "name", "email"],
    });
    res.status(200).send(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.message);
    res.status(500).send("Erro ao buscar usuários.");
  }
};

// GET
const getSingleUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ where: { id_user: id } });
    res.status(200).send(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    res.status(500).send("Erro ao buscar usuário.");
  }
};

// PUT
const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const { name, email, password } = req.body;
    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData.password = hashedPassword;
    }

    await User.update(updatedData, { where: { id_user: id } });

    res.status(200).send({ message: `Usuário editado com sucesso: ${id}` });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    res
      .status(500)
      .send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.destroy({ where: { id_user: id } });
    res.status(200).send(`Usuário deletado com sucesso: ${id}`);
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message);
    res.status(500).send("Erro ao deletar usuário.");
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send("Senha incorreta");
    }

    const accessToken = jwt.sign(
      { id: user.id_user, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Usuário logado com sucesso", accessToken });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).send("Erro no servidor");
  }
};

export default {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
};
