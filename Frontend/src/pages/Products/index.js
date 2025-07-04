import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";
 
import {
  Container,
  Title,
  PrimaryButton,
  TableContainer, // NOVO: Usar TableContainer
  Table,
  TableHeader,
  ScrollableTableBody, // NOVO: Usar ScrollableTableBody
  ActionButton,
  ActionButtonsWrapper,
  ModalOverlay,
  ModalContent,
  Input,
  Select,
  Button,
  ErrorMessage,
} from "./style";
 
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState("");
 
  useEffect(() => {
    loadProducts();
  }, []);
 
  const loadProducts = async () => {
    try {
      const response = await api.get("/api/products/AllProducts");
      setProducts(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err.response || err);
      setError("Erro ao carregar produtos.");
    }
  };
 
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };
 
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
 
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await api.delete(`/api/products/${id}`);
        loadProducts();
      } catch (err) {
        console.error("Erro ao excluir produto:", err.response || err);
        setError("Erro ao excluir produto.");
      }
    }
  };
 
  return (
<Container>
<Title>Gerenciamento de Produtos</Title>
<PrimaryButton onClick={handleAddProduct}>
<AiOutlinePlus size={20} /> Adicionar Produto
</PrimaryButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
 
      <TableContainer> {/* NOVO: Envolve a tabela na caixa de vidro */}
<Table> {/* A tabela em si */}
<TableHeader>
<tr>
<th>ID</th>
<th>Nome</th>
<th>Preço</th>
<th>Categoria ID</th>
<th>Ações</th>
</tr>
</TableHeader>
<ScrollableTableBody> {/* NOVO: O corpo da tabela com rolagem */}
            {products.map((product) => (
<tr key={product.id_product}>
<td>{product.id_product}</td>
<td>{product.name}</td>
<td>R$ {parseFloat(product.price).toFixed(2)}</td>
<td>{product.category_id}</td>
<td>
<ActionButtonsWrapper>
<ActionButton $isEdit onClick={() => handleEditProduct(product)}>
                      Editar
</ActionButton>
<ActionButton $isDelete onClick={() => handleDeleteProduct(product.id_product)}>
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
<ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={currentProduct}
          onProductSaved={loadProducts}
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Input={Input}
          Select={Select}
          Button={Button}
          ErrorMessage={ErrorMessage}
        />
      )}
</Container>
  );
};
 
// Componente Modal para Adicionar/Editar Produto
const ProductModal = ({ isOpen, onClose, product, onProductSaved, ModalOverlay, ModalContent, Input, Select, Button, ErrorMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/api/categories/AllCategories");
        setCategories(response.data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err.response || err);
        setError("Erro ao carregar categorias para seleção.");
      }
    };
 
    if (isOpen) {
      loadCategories();
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          category_id: product.category_id || "",
        });
      } else {
        setFormData({
          name: "",
          price: "",
          category_id: "",
        });
      }
    }
  }, [isOpen, product]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
 
    if (!formData.name || !formData.price || !formData.category_id) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
 
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      category_id: parseInt(formData.category_id),
    };
 
    try {
      if (product) {
        await api.put(`/api/products/${product.id_product}`, productData);
      } else {
        await api.post("/api/products/addProduct", productData);
      }
      onProductSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar produto:", err.response || err);
      setError("Erro ao salvar produto. Verifique os dados e tente novamente.");
    }
  };
 
  if (!isOpen) return null;
 
  return (
<ModalOverlay>
<ModalContent>
<h2>{product ? "Editar Produto" : "Novo Produto"}</h2>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
<Input
            type="text"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
            required
          />
<Input
            type="number"
            name="price"
            placeholder="Preço"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
<Select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
>
<option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
<option key={cat.id_category} value={cat.id_category}>
                {cat.name}
</option>
            ))}
</Select>
          {error && <ErrorMessage>{error}</ErrorMessage>}
<div className="button-group">
<Button type="submit" className="primary-action">{product ? "Atualizar" : "Criar"}</Button>
<Button type="button" className="secondary-action" onClick={onClose}>
              Cancelar
</Button>
</div>
</form>
</ModalContent>
</ModalOverlay>
  );
};
 
export default Products;