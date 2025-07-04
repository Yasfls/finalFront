import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus } from "react-icons/ai";
import { getToken } from "../../services/auth";
import { jwtDecode } from "jwt-decode";

// IMPORTANTE: Importar todos os componentes estilizados do arquivo style.js
import {
  Container,
  Title,
  PrimaryButton,
  TableContainer,
  Table,
  TableHeader,
  ScrollableTableBody,
  ActionButtonsWrapper,
  ActionButton,
  ModalOverlay,
  ModalContent,
  Input,
  Button,
  ErrorMessage,
  TextArea,
  // Novos componentes para itens de produto no modal
  ProductItemWrapper,
  ProductsListContainer,
  ProductListItemLabel,
  ProductListItemInputGroup
} from "./style";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        setError("Erro ao obter informações do usuário. Faça login novamente.");
      }
    }
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get("/api/orders/AllOrders");
      setOrders(response.data);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err.response || err);
      setError("Erro ao carregar pedidos.");
    }
  };

  const handleCreateOrder = () => {
    if (!userId) {
        setError("Usuário não logado. Por favor, faça login para criar pedidos.");
        return;
    }
    setError("");
    setShowProductSelection(true);
  };

  const handleProductSelectionConfirm = async (selectedProductsWithDetails) => {
    try {
      if (!userId) {
        throw new Error("ID do usuário não disponível para criar pedido.");
      }

      const productsForOrder = selectedProductsWithDetails.map((item) => ({
        id_product: item.id_product,
        quant: item.quantity,
        observacao: item.observacao,
      }));

      const response = await api.post("/api/orders/addOrder", {
        user_id: userId,
        products: productsForOrder,
      });

      console.log("Pedido criado com sucesso:", response.data);
      setShowProductSelection(false);
      loadOrders();
    } catch (err) {
      console.error("Erro ao criar pedido com produtos:", err.response || err);
      setError("Erro ao criar pedido: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido? Esta ação é irreversível.")) {
      try {
        setError("");
        await api.delete(`/api/orders/${id}`);
        loadOrders();
      } catch (err) {
        console.error("Erro ao excluir pedido:", err.response || err);
        setError("Erro ao excluir pedido.");
      }
    }
  };

  const handleViewOrder = async (order) => {
    try {
      const response = await api.get(`/api/orders/${order.id_order}`);
      setCurrentOrder(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao carregar detalhes do pedido:", err.response || err);
      setError("Erro ao carregar detalhes do pedido.");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/orders/${id}`, { status: newStatus });
      loadOrders();
    } catch (err) {
      console.error("Erro ao atualizar status do pedido:", err.response || err);
      setError("Erro ao atualizar status do pedido.");
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Pedidos</Title>
      <PrimaryButton onClick={handleCreateOrder}>
        <AiOutlinePlus size={20} /> Criar Novo Pedido
      </PrimaryButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TableContainer> {/* Envolve a tabela na caixa de vidro */}
        <Table>
          <TableHeader>
            <tr>
              <th>ID do Pedido</th>
              <th>ID do Usuário</th>
              <th>Data/Hora Criação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </TableHeader>
          <ScrollableTableBody> {/* Corpo da tabela com rolagem */}
            {orders.map((order) => (
              <tr key={order.id_order}>
                <td>{order.id_order}</td>
                <td>{order.user_id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <ActionButtonsWrapper>
                    <ActionButton $isView onClick={() => handleViewOrder(order)}>Visualizar</ActionButton>
                    <ActionButton $isPrepare onClick={() => handleUpdateStatus(order.id_order, "Em Preparo")}>Em Preparo</ActionButton>
                    <ActionButton $isReady onClick={() => handleUpdateStatus(order.id_order, "Pronto")}>Pronto</ActionButton>
                    <ActionButton $isDeliver onClick={() => handleUpdateStatus(order.id_order, "Entregue")}>Entregue</ActionButton>
                    <ActionButton $isDelete onClick={() => handleDeleteOrder(order.id_order)}>Excluir</ActionButton>
                  </ActionButtonsWrapper>
                </td>
              </tr>
            ))}
          </ScrollableTableBody>
        </Table>
      </TableContainer>

      {showProductSelection && (
        <ProductSelectionModal
          onClose={() => setShowProductSelection(false)}
          onConfirm={handleProductSelectionConfirm}
          // Passando os Styled Components para o modal de seleção de produtos
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Input={Input}
          Button={Button}
          ErrorMessage={ErrorMessage}
          TextArea={TextArea}
        />
      )}
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={currentOrder}
          // Passando os Styled Components para o modal de visualização de pedido
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Button={Button}
        />
      )}
    </Container>
  );
};

// Componente Modal para Visualização de Pedidos
const OrderModal = ({ isOpen, onClose, order, ModalOverlay, ModalContent, Button }) => {
  if (!isOpen || !order) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.id_order}</h2>
        <div>
          <p><strong>ID do Usuário:</strong> {order.user_id}{order.user && ` (${order.user.name})`}</p>
          <p><strong>Data/Hora:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
        <div>
          <h3>Produtos do Pedido</h3>
          {order.products && order.products.length > 0 ? (
            order.products.map((item) => (
              <ProductItemWrapper key={item.id_product}> {/* Usando ProductItemWrapper */}
                <p>
                  <strong>{item.name}</strong> - R$ {parseFloat(item.price).toFixed(2)} - Quantidade: {item.order_product.quantity}
                </p>
                {item.order_product.observacao && <p>Observação: {item.order_product.observacao}</p>}
              </ProductItemWrapper>
            ))
          ) : (
            <p>Nenhum produto associado a este pedido.</p>
          )}
        </div>
        <div className="button-group">
          <Button type="button" className="secondary-action" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

// Componente Modal para Seleção de Produtos para um Novo Pedido
const ProductSelectionModal = ({ onClose, onConfirm, ModalOverlay, ModalContent, Input, Button, ErrorMessage, TextArea }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
    <ModalOverlay>
      <ModalContent>
        <h2>Selecionar Produtos para o Pedido</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ProductsListContainer> {/* Usando ProductsListContainer */}
          {products.map((product) => {
            const isChecked = selectedProducts.some(
              (p) => p.id_product === product.id_product
            );
            const currentSelectedProduct = selectedProducts.find(
              (p) => p.id_product === product.id_product
            );
            return (
              <div key={product.id_product} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <ProductListItemLabel> {/* Usando ProductListItemLabel */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleProductSelect(product)}
                  />
                  {product.name} - R$ {parseFloat(product.price).toFixed(2)}
                </ProductListItemLabel>
                {isChecked && (
                  <ProductListItemInputGroup> {/* Usando ProductListItemInputGroup */}
                    <Input // Usando Input estilizado
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      value={currentSelectedProduct?.quantity || 1}
                      onChange={(e) => handleQuantityChange(product.id_product, e.target.value)}
                    />
                    <TextArea // Usando TextArea estilizado
                      placeholder="Observações (opcional)"
                      value={currentSelectedProduct?.observacao || ""}
                      onChange={(e) => handleObservationChange(product.id_product, e.target.value)}
                      rows="2"
                    />
                  </ProductListItemInputGroup>
                )}
              </div>
            );
          })}
        </ProductsListContainer>
        <div className="button-group">
          <Button className="primary-action" onClick={handleConfirm}>Confirmar Pedido</Button>
          <Button className="secondary-action" onClick={onClose}>Cancelar</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Orders;