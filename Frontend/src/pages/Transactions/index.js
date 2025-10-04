import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { AiOutlinePlus, AiOutlineDownload } from "react-icons/ai"; // Adicionado ícone de Download

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
  Select,
  Button,
  ErrorMessage,
  ProductItemWrapper,
  TextArea,
} from "../Transactions/style"; // Reutilizando os estilos de Orders (agora Transactions)


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setError("");
      // 💰 API para Transações do usuário logado
      const response = await api.get("/api/transactions/all");
      setTransactions(response.data);
    } catch (err) {
      console.error("Erro ao carregar transações:", err.response || err);
      setError("Erro ao carregar o histórico financeiro.");
    }
  };

  const handleAddTransaction = () => {
    setCurrentTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        setError("");
        await api.delete(`/api/transactions/${id}`);
        loadTransactions();
      } catch (err) {
        console.error("Erro ao excluir transação:", err.response || err);
        setError("Erro ao excluir transação.");
      }
    }
  };
  
  const handleDownloadAttachment = (filePath) => {
    // 📁 Link para o arquivo (backend deve estar servindo a pasta /attachments)
    window.open(`http://localhost:3000/${filePath}`, '_blank'); 
  };


  return (
    <Container>
      <Title>Gerenciamento de Transações</Title>
      <PrimaryButton onClick={handleAddTransaction}>
        <AiOutlinePlus size={20} /> Registrar Nova Transação
      </PrimaryButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </TableHeader>

          <ScrollableTableBody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id_transaction} style={{ color: t.type === 'RECEITA' ? 'green' : 'red' }}>
                  <td>{new Date(t.date).toLocaleDateString("pt-BR")}</td>
                  <td>{t.type}</td>
                  <td>R$ {parseFloat(t.amount).toFixed(2).replace('.', ',')}</td>
                  <td>{t.description}</td>
                  <td>{t.category ? t.category.name : 'N/A'}</td>
                  <td>
                    <ActionButtonsWrapper>
                      <ActionButton $isEdit onClick={() => handleEditTransaction(t)}>
                        Editar
                      </ActionButton>
                        {t.attachment?.file_path && (
                            <ActionButton $isView onClick={() => handleDownloadAttachment(t.attachment.file_path)}>
                                <AiOutlineDownload size={14} /> Anexo
                            </ActionButton>
                        )}
                      <ActionButton $isDelete onClick={() => handleDeleteTransaction(t.id_transaction)}>
                        Excluir
                      </ActionButton>
                    </ActionButtonsWrapper>
                  </td>
                </tr>
              ))
            )} {/* <-- CORREÇÃO AQUI: Fechamento do map e do operador ternário. */}
          </ScrollableTableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={currentTransaction}
          onTransactionSaved={loadTransactions}
          // Passando componentes de estilo para o modal (reutilizando)
          ModalOverlay={ModalOverlay}
          ModalContent={ModalContent}
          Input={Input}
          Select={Select}
          Button={Button}
          ErrorMessage={ErrorMessage}
          TextArea={TextArea}
        />
      )}
    </Container>
  );
};

const TransactionModal = ({ isOpen, onClose, transaction, onTransactionSaved, ModalOverlay, ModalContent, Input, Select, Button, ErrorMessage, TextArea }) => {
  const [formData, setFormData] = useState({
    type: transaction?.type || "DESPESA",
    amount: transaction?.amount || "",
    description: transaction?.description || "",
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category_id: transaction?.category_id || "",
    attachment: null, // Novo campo para o arquivo
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
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment' && files) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { type, amount, description, date, category_id, attachment } = formData;

    if (!type || !amount || !description || !date || !category_id) {
      setError("Todos os campos de texto são obrigatórios.");
      return;
    }
    
    // Cria FormData para enviar arquivos
    const data = new FormData();
    data.append('type', type);
    data.append('amount', amount);
    data.append('description', description);
    data.append('date', date);
    data.append('category_id', category_id);
    if (attachment) {
        data.append('attachment', attachment); // Campo de arquivo
    }

    try {
      if (transaction) {
        // PUT para atualizar - Não permite trocar o anexo diretamente com o FormData PUT
        // Usaremos apenas o PUT para os dados não-arquivos e o POST/DELETE para o anexo separadamente em um app mais robusto.
        // Por simplificação, o PUT abaixo só envia dados do corpo.
        const updateData = { type, amount, description, date, category_id };

        await api.put(`/api/transactions/${transaction.id_transaction}`, updateData);
      } else {
        // POST para criar - Usa o FormData para suportar o anexo
        await api.post("/api/transactions/add", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
      }
      onTransactionSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar transação:", err.response || err);
      setError("Erro ao salvar transação. " + (err.response?.data?.message || "Verifique os dados e o arquivo."));
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{transaction ? "Editar Transação" : "Nova Transação"}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="DESPESA">DESPESA</option>
            <option value="RECEITA">RECEITA</option>
          </Select>
          <Input
            type="number"
            name="amount"
            placeholder="Valor (R$)"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <TextArea
            name="description"
            placeholder="Descrição da transação"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
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
          {!transaction && ( // Permite upload apenas na criação
            <>
                <label style={{ color: '#555', fontSize: '0.9em', marginTop: '10px' }}>
                    Anexar Cupom Fiscal (PDF ou Imagem, máx 5MB):
                </label>
                <Input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    style={{ height: 'auto', paddingTop: '10px' }}
                />
            </>
          )}

          <div className="button-group">
            <Button type="submit" className="primary-action">
              {transaction ? "Atualizar" : "Registrar"}
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

export default Transactions;