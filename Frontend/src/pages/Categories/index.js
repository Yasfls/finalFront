import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";

// Importar TODOS os componentes estilizados necessários
import {
  Container,
  Title,
  PrimaryButton,
  TableContainer,      // NOVO: Importado para envolver a tabela
  Table,
  TableHeader,
  ScrollableTableBody, // NOVO: Substitui TableBody para rolagem
  ActionButton,
  ActionButtonsWrapper,
  ModalOverlay,
  ModalContent,
  Input,
  Button,
  ErrorMessage // NOVO: Para exibir mensagens de erro estilizadas
} from "./style";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [error, setError] = useState(""); // Estado de erro para a página principal

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
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Usando o componente ErrorMessage */}

      <TableContainer> {/* NOVO: Envolve a tabela na caixa de vidro */}
        <Table>
          <TableHeader>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </TableHeader>
          <ScrollableTableBody> {/* NOVO: Substitui TableBody para ter rolagem */}
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
      </TableContainer> {/* Fim do TableContainer */}

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={currentCategory}
          onCategorySaved={loadCategories}
          // Passando os Styled Components para o modal
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Input={Input}
          Button={Button}
          ErrorMessage={ErrorMessage} // Passando ErrorMessage para o modal também
        />
      )}
    </Container>
  );
};

// Componente Modal para Adicionar/Editar Categoria (Agora recebe Styled Components como props)
const CategoryModal = ({ isOpen, onClose, category, onCategorySaved, ModalOverlay, ModalContent, Input, Button, ErrorMessage }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(""); // Estado de erro para o modal

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    } else {
      setCategoryName("");
    }
    setError(""); // Limpa o erro ao abrir o modal
  }, [category, isOpen]); // Adicionado isOpen como dependência para resetar ao abrir

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
          <Input // Usando o componente Input estilizado
            type="text"
            placeholder="Nome da Categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>} {/* Usando o componente ErrorMessage */}
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