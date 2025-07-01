import React, { useState, useEffect } from "react";
// Removido: import { Container, Title, ModalOverlay, ModalContent } from "./style"; // Sem styled components
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";
import { getToken } from "../../services/auth";
import { jwtDecode } from "jwt-decode"; // Certifique-se de instalar: npm install jwt-decode

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [userId, setUserId] = useState(null); // Para armazenar o ID do usuário logado

  useEffect(() => {
    // Ao carregar o componente, tenta decodificar o token para obter o user_id
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // O 'id' no payload do token deve ser o id_user do seu banco
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        setError("Erro ao obter informações do usuário. Faça login novamente.");
      }
    }
    loadOrders(); // Carrega a lista de pedidos
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get("/api/orders/AllOrders"); // ENDPOINT CORRIGIDO
      setOrders(response.data);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err.response || err);
      setError("Erro ao carregar pedidos.");
    }
  };

  const handleCreateOrder = () => {
    if (!userId) { // Verifica se o ID do usuário está disponível
        setError("Usuário não logado. Por favor, faça login para criar pedidos.");
        return;
    }
    setError(""); // Limpa erros anteriores
    setShowProductSelection(true); // Abre o modal de seleção de produtos
  };

  const handleProductSelectionConfirm = async (selectedProductsWithDetails) => {
    try {
      if (!userId) {
        throw new Error("ID do usuário não disponível para criar pedido.");
      }

      // Formata os produtos selecionados para o formato esperado pelo backend
      const productsForOrder = selectedProductsWithDetails.map((item) => ({
        id_product: item.id_product,
        quant: item.quantity,
        observacao: item.observacao,
      }));

      // Envia o pedido completo ao backend
      const response = await api.post("/api/orders/addOrder", {
        user_id: userId, // Envia o ID do usuário logado
        products: productsForOrder,
      });

      console.log("Pedido criado com sucesso:", response.data);
      setShowProductSelection(false); // Fecha o modal de seleção
      loadOrders(); // Recarrega a lista de pedidos
    } catch (err) {
      console.error("Erro ao criar pedido com produtos:", err.response || err);
      setError("Erro ao criar pedido: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido? Esta ação é irreversível.")) {
      try {
        setError("");
        await api.delete(`/api/orders/${id}`); // ENDPOINT CORRIGIDO
        loadOrders(); // Recarrega a lista após exclusão
      } catch (err) {
        console.error("Erro ao excluir pedido:", err.response || err);
        setError("Erro ao excluir pedido.");
      }
    }
  };

  const handleViewOrder = async (order) => {
    try {
      // Pede os detalhes completos do pedido ao backend (que agora deve incluir os produtos)
      const response = await api.get(`/api/orders/${order.id_order}`); // ENDPOINT CORRIGIDO
      setCurrentOrder(response.data); // Define o pedido com seus produtos associados
      setIsModalOpen(true); // Abre o modal de visualização
    } catch (err) {
      console.error("Erro ao carregar detalhes do pedido:", err.response || err);
      setError("Erro ao carregar detalhes do pedido.");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/orders/${id}`, { status: newStatus }); // ENDPOINT E PAYLOAD CORRIGIDOS
      loadOrders(); // Recarrega a lista de pedidos para refletir a mudança
    } catch (err) {
      console.error("Erro ao atualizar status do pedido:", err.response || err);
      setError("Erro ao atualizar status do pedido.");
    }
  };

  return (
    <div style={{ paddingLeft: '80px', paddingTop: '20px' }}> {/* Substituído Container */}
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Gerenciamento de Pedidos</h1> {/* Substituído Title */}
      <button className="create-order-btn" onClick={handleCreateOrder} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
        <AiOutlinePlus size={20} style={{ marginRight: '5px' }}/> Criar Novo Pedido
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID do Pedido</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID do Usuário</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Data/Hora Criação</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id_order} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.id_order}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.user_id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.createdAt).toLocaleString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => handleViewOrder(order)} style={{ padding: '5px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
                  Visualizar
                </button>
                <button onClick={() => handleUpdateStatus(order.id_order, "Em Preparo")} style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
                  Em Preparo
                </button>
                <button onClick={() => handleUpdateStatus(order.id_order, "Pronto")} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
                  Pronto
                </button>
                <button onClick={() => handleUpdateStatus(order.id_order, "Entregue")} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px' }}>
                  Entregue
                </button>
                <button onClick={() => handleDeleteOrder(order.id_order)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showProductSelection && (
        <ProductSelectionModal
          onClose={() => setShowProductSelection(false)}
          onConfirm={handleProductSelectionConfirm}
        />
      )}
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={currentOrder}
        />
      )}
    </div>
  );
};

// Componente Modal para Visualização de Pedidos (Sem Estilos)
const OrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}> {/* Substituído ModalOverlay */}
      <div style={{
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        maxWidth: '600px', width: '90%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}> {/* Substituído ModalContent */}
        <h2 style={{ marginBottom: '15px' }}>Detalhes do Pedido #{order.id_order}</h2>
        <div style={{ marginBottom: '15px' }}>
          <p><strong>ID do Usuário:</strong> {order.user_id}{order.user && ` (${order.user.name})`}</p>
          <p><strong>Data/Hora:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <h3 style={{ marginBottom: '10px' }}>Produtos do Pedido</h3>
          {order.products && order.products.length > 0 ? (
            order.products.map((item) => (
              <div key={item.id_product} style={{ borderBottom: '1px dashed #eee', padding: '8px 0' }}>
                <p>
                  <strong>{item.name}</strong> - R$ {parseFloat(item.price).toFixed(2)} - Quantidade: {item.order_product.quantity}
                </p>
                {item.order_product.observacao && <p style={{ fontSize: '0.9em', color: '#555' }}>Observação: {item.order_product.observacao}</p>}
              </div>
            ))
          ) : (
            <p>Nenhum produto associado a este pedido.</p>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={onClose} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Modal para Seleção de Produtos para um Novo Pedido (Sem Estilos)
const ProductSelectionModal = ({ onClose, onConfirm }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
      setError("Erro ao carregar produtos para seleção.");
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find(
      (p) => p.id_product === product.id_product
    );

    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.id_product !== product.id_product)
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          id_product: product.id_product,
          name: product.name,
          price: product.price,
          quantity: 1,
          observacao: "",
        },
      ]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id_product === productId ? { ...p, quantity: parseInt(quantity) || 1 } : p
      )
    );
  };

  const handleObservationChange = (productId, observation) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id_product === productId ? { ...p, observacao: observation } : p
      )
    );
  };

  const handleConfirm = () => {
    if (selectedProducts.length === 0) {
      setError("Selecione pelo menos um produto.");
      return;
    }
    onConfirm(selectedProducts);
    onClose();
  };

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
        <h2 style={{ marginBottom: '15px' }}>Selecionar Produtos para o Pedido</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ maxHeight: "300px", overflowY: "auto", border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          {products.map((product) => {
            const isChecked = selectedProducts.some(
              (p) => p.id_product === product.id_product
            );
            const currentSelectedProduct = selectedProducts.find(
              (p) => p.id_product === product.id_product
            );
            return (
              <div key={product.id_product} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProductSelect(product)}
                    style={{ marginRight: '8px' }}
                  />
                  {product.name} - R$ {parseFloat(product.price).toFixed(2)}
                </label>
                {isChecked && (
                  <div style={{ marginLeft: '25px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      value={currentSelectedProduct?.quantity || 1}
                      onChange={(e) => handleQuantityChange(product.id_product, e.target.value)}
                      style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: '100px' }}
                    />
                    <textarea
                      placeholder="Observações (opcional)"
                      value={currentSelectedProduct?.observacao || ""}
                      onChange={(e) => handleObservationChange(product.id_product, e.target.value)}
                      rows="2"
                      style={{ padding: '6px', border: '1px solid #ddd', borderRadius: '4px', width: 'calc(100% - 10px)' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleConfirm} style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Confirmar Pedido</button>
          <button onClick={onClose} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;