import express from 'express';
import orderController from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Rotas relacionadas aos pedidos (requer autenticação)
 */

/**
 * @swagger
 * /api/orders/addOrder:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 2
 *                     quant:
 *                       type: integer
 *                       example: 3
 * observacao:
 * type: string
 * example: Sem cebola
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.post('/addOrder', authenticateToken, orderController.addOrder);

/**
 * @swagger
 * /api/orders/AllOrders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar pedidos
 */
router.get('/AllOrders', authenticateToken, orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao buscar pedido
 */
router.get('/:id', authenticateToken, orderController.getSingleOrder);

/**
 * @swagger
 * /api/orders/{id}:
 * put:
 * summary: Atualiza um pedido pelo ID (principalmente o status)
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID do pedido
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * status:
 * type: string
 * example: Pronto
 * responses:
 * 200:
 * description: Pedido atualizado com sucesso
 * 401:
 * description: Não autorizado
 * 404:
 * description: Pedido não encontrado
 * 500:
 * description: Erro ao atualizar pedido
 */
router.put('/:id', authenticateToken, orderController.updateOrder); // NOVA ROTA PUT

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Deleta um pedido pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao deletar pedido
 */
router.delete('/:id', authenticateToken, orderController.deleteOrder);

export default router;