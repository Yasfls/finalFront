import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";

import {
  Container,
  Title,
  PrimaryButton,
  TableContainer,
  Table,
  TableHeader,
  ScrollableTableBody,
  ActionButton,
  ActionButtonsWrapper,
  ModalOverlay,
  ModalContent,
  Input,
  Button,
  ErrorMessage
} from "./style";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setError("");
      const response = await api.get("/api/categories/AllCategories");
      setCategories(response.data);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err.response || err);
      setError("Erro ao carregar categorias.");
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        setError("");
        await api.delete(`/api/categories/${id}`);
        loadCategories();
      } catch (err) {
        console.error("Erro ao excluir categoria:", err.response || err);
        setError("Erro ao excluir categoria.");
      }
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Categorias</Title>
      <PrimaryButton onClick={handleAddCategory}>
        <AiOutlinePlus size={20} /> Criar Nova Categoria
      </PrimaryButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </TableHeader>
          <ScrollableTableBody>
            {categories.map((category) => (
              <tr key={category.id_category}>
                <td>{category.id_category}</td>
                <td>{category.name}</td>
                <td>
                  <ActionButtonsWrapper>
                    <ActionButton $isEdit onClick={() => handleEditCategory(category)}>
                      Editar
                    </ActionButton>
                    <ActionButton $isDelete onClick={() => handleDeleteCategory(category.id_category)}>
                      Excluir
                    </ActionButton>
                  </ActionButtonsWrapper>
                </td>
              </tr>
            ))}
          </ScrollableTableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={currentCategory}
          onCategorySaved={loadCategories}
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Input={Input}
          Button={Button}
          ErrorMessage={ErrorMessage}
        />
      )}
    </Container>
  );
};

const CategoryModal = ({ isOpen, onClose, category, onCategorySaved, ModalOverlay, ModalContent, Input, Button, ErrorMessage }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName("");
    }
    setError("");
  }, [category, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!categoryName.trim()) {
      setError("O nome da categoria é obrigatório.");
      return;
    }

    try {
      if (category) {
        await api.put(`/api/categories/${category.id_category}`, { name: categoryName });
      } else {
        await api.post("/api/categories/addCategory", { name: categoryName });
      }
      onCategorySaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err.response || err);
      setError("Erro ao salvar categoria. Verifique os dados.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{category ? "Editar Categoria" : "Nova Categoria"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            type="text"
            placeholder="Nome da Categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div className="button-group">
            <Button type="submit" className="primary-action">
              {category ? "Atualizar" : "Criar"}
            </Button>
            <Button type="button" className="secondary-action" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Categories;