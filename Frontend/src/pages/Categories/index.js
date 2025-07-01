import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai"; // Ícone de adição

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // Para edição
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setError("");
      const response = await api.get("/api/categories/AllCategories"); // Endpoint correto
      setCategories(response.data);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err.response || err);
      setError("Erro ao carregar categorias.");
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null); // Limpa o estado para criar uma nova categoria
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category); // Define a categoria atual para edição
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        setError("");
        await api.delete(`/api/categories/${id}`); // Endpoint correto
        loadCategories(); // Recarrega a lista após exclusão
      } catch (err) {
        console.error("Erro ao excluir categoria:", err.response || err);
        setError("Erro ao excluir categoria.");
      }
    }
  };

  return (
    <div style={{ paddingLeft: "80px", paddingTop: "20px" }}>
           {" "}
      <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>
        Gerenciamento de Categorias
      </h1>
           {" "}
      <button
        onClick={handleAddCategory}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
                <AiOutlinePlus size={20} style={{ marginRight: "5px" }} /> Criar
        Nova Categoria      {" "}
      </button>
            {error && <p style={{ color: "red" }}>{error}</p>}     {" "}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
               {" "}
        <thead>
                   {" "}
          <tr style={{ backgroundColor: "#f2f2f2" }}>
                       {" "}
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              ID
            </th>
                       {" "}
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Nome
            </th>
                       {" "}
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Ações
            </th>
                     {" "}
          </tr>
                 {" "}
        </thead>
               {" "}
        <tbody>
                   {" "}
          {categories.map((category) => (
            <tr
              key={category.id_category}
              style={{ borderBottom: "1px solid #eee" }}
            >
                           {" "}
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {category.id_category}
              </td>
                           {" "}
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {category.name}
              </td>
                           {" "}
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                               {" "}
                <button
                  onClick={() => handleEditCategory(category)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ffc107",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                                    Editar                {" "}
                </button>
                               {" "}
                <button
                  onClick={() => handleDeleteCategory(category.id_category)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                                    Excluir                {" "}
                </button>
                             {" "}
              </td>
                         {" "}
            </tr>
          ))}
                 {" "}
        </tbody>
             {" "}
      </table>
           {" "}
      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={currentCategory}
          onCategorySaved={loadCategories} // Recarrega a lista após salvar
        />
      )}
         {" "}
    </div>
  );
};

// Componente Modal para Adicionar/Editar Categoria (Sem Estilos)
const CategoryModal = ({ isOpen, onClose, category, onCategorySaved }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.name); // Preenche o nome para edição
    } else {
      setCategoryName(""); // Limpa o nome para nova categoria
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!categoryName.trim()) {
      setError("O nome da categoria é obrigatório.");
      return;
    }

    try {
      if (category) {
        // Edição
        await api.put(`/api/categories/${category.id_category}`, {
          name: categoryName,
        }); // Endpoint correto
      } else {
        // Criação
        await api.post("/api/categories/addCategory", { name: categoryName }); // Endpoint correto
      }
      onCategorySaved(); // Recarrega a lista
      onClose(); // Fecha o modal
    } catch (err) {
      console.error("Erro ao salvar categoria:", err.response || err);
      setError("Erro ao salvar categoria. Verifique os dados.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {" "}
      {/* Overlay do modal */}     {" "}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {" "}
        {/* Conteúdo do modal */}       {" "}
        <h2 style={{ marginBottom: "20px" }}>
          {category ? "Editar Categoria" : "Nova Categoria"}
        </h2>
               {" "}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
                   {" "}
          <input
            type="text"
            placeholder="Nome da Categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
                    {error && <p style={{ color: "red" }}>{error}</p>}         {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
                       {" "}
            <button
              type="submit"
              style={{
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {category ? "Atualizar" : "Criar"}
            </button>
                       {" "}
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
                            Cancelar            {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Categories;
