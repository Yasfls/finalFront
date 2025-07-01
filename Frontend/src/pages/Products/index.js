import React, { useState, useEffect } from "react";
// Removido: import { Container, Title, ModalOverlay, ModalContent } from "./style"; // Sem styled components
import api from "../../services/api";

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
      const response = await api.get("/api/products/AllProducts"); // ENDPOINT CORRIGIDO
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
        await api.delete(`/api/products/${id}`); // ENDPOINT CORRIGIDO
        loadProducts();
      } catch (err) {
        console.error("Erro ao excluir produto:", err.response || err);
        setError("Erro ao excluir produto.");
      }
    }
  };

  return (
    <div style={{ paddingLeft: '80px', paddingTop: '20px' }}> {/* Substituído Container */}
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Gerenciamento de Produtos</h1> {/* Substituído Title */}
      <button onClick={handleAddProduct} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>Adicionar Produto</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Preço</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Categoria ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id_product} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.id_product}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>R$ {parseFloat(product.price).toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.category_id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => handleEditProduct(product)} style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product.id_product)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={currentProduct}
          onProductSaved={loadProducts}
        />
      )}
    </div>
  );
};

// Componente Modal para Adicionar/Editar Produto (Sem Estilos)
const ProductModal = ({ isOpen, onClose, product, onProductSaved }) => {
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
        const response = await api.get("/api/categories/AllCategories"); // ENDPOINT CORRETO
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
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}> {/* Substituído ModalOverlay */}
      <div style={{
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        maxWidth: '500px', width: '90%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}> {/* Substituído ModalContent */}
        <h2 style={{ marginBottom: '20px' }}>{product ? "Editar Produto" : "Novo Produto"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id_category} value={cat.id_category}>
                {cat.name}
              </option>
            ))}
          </select>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{product ? "Atualizar" : "Criar"}</button>
            <button type="button" onClick={onClose} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Products;