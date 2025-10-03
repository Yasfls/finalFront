import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const User = db.User;

const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 🔐 Mass Assignment Defense (Whitelisting): Apenas os campos permitidos são lidos
    let info = {
      // id_user: req.body.id_user (REMOVIDO: Previne ID injection)
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    };

    const user = await User.create(info);
    
    // Não retornar a senha (mesmo que hashed)
    const { password: _, ...userInfo } = user.toJSON(); 
    res.status(201).send(userInfo);
    console.log(`Usuário adicionado: ${userInfo.name}`);
  } catch (error) { // Captura e loga o erro corretamente
    console.error("Erro ao adicionar usuário:", error.message);
    res.status(500).send("Erro ao adicionar usuário");
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      // 🔐 Retorna apenas atributos seguros
      attributes: ["id_user", "name", "email", "createdAt", "updatedAt"], 
    });
    res.status(200).send(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.message);
    res.status(500).send("Erro ao buscar usuários.");
  }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;

    // 🔐 Propriedade: Garante que o usuário só pode ver seus próprios dados
    if (req.user && req.user.id !== parseInt(id)) {
        return res.status(403).send({ message: "Acesso negado. Você só pode ver seu próprio perfil." });
    }

  try {
      let user = await User.findOne({ 
          where: { id_user: id },
          // 🔐 Retorna apenas atributos seguros
          attributes: ["id_user", "name", "email", "createdAt", "updatedAt"], 
      });
      
      if (!user) {
          return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.status(200).send(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    res.status(500).send("Erro ao buscar usuário.");
  }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    
    // 🔐 Propriedade: Garante que o usuário só pode atualizar seus próprios dados
    if (req.user && req.user.id !== parseInt(id)) {
        return res.status(403).send({ message: "Acesso negado. Você só pode editar seu próprio perfil." });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        // 🔐 Mass Assignment Defense: Apenas os campos permitidos são lidos
        const { name, email, password } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedData.password = hashedPassword;
        }
        // updateData é seguro contra Mass Assignment (whitelisting)
        await User.update(updatedData, { where: { id_user: id } });

        res.status(200).send({ message: `Usuário editado com sucesso: ${id}` });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        res
            .status(500)
            .send({ message: "Erro ao atualizar usuário", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    // 🔐 Propriedade: Garante que o usuário só pode se deletar
    if (req.user && req.user.id !== parseInt(id)) {
        return res.status(403).send({ message: "Acesso negado. Você só pode deletar seu próprio perfil." });
    }

    try {
        const deletedRows = await User.destroy({ where: { id_user: id } });
        
        if (deletedRows === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }
        
        // 🔐 Limpa o cookie após a exclusão da conta
        res.clearCookie('jwt'); 
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

    // 🔐 CRÍTICO: Enviar JWT via HttpOnly Cookie (Defesa contra Session Hijacking/XSS)
    res.cookie('jwt', accessToken, {
        httpOnly: true, // Inacessível via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS em produção
        maxAge: 3600000, // 1 hora em milissegundos
        sameSite: 'strict', // Defesa contra CSRF
    });

    // Não retornar o token no corpo para forçar o uso do cookie
    res
      .status(200)
      .json({ message: "Usuário logado com sucesso" });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).send("Erro no servidor");
  }
};

// 🔐 NOVA FUNÇÃO: Logout (Limpa o cookie)
const logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Limpa o HttpOnly cookie
    res.status(200).json({ message: "Logout realizado com sucesso." });
};

export default {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser, // Exporta a nova função de logout
};