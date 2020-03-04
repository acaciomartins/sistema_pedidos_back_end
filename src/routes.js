const express = require('express');
const routes = express.Router();
const multer = require('multer')

const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');

// const upload = multer({ dest: '../frontend/api/src/assets/produtos/uploads/' })

/* CLIENTES */

// incluir cliente
routes.post('/cliente', ClienteController.incluirCliente);

// listar clientes
routes.get('/clientes', ClienteController.listarCliente);

// consultar cliente por id
routes.get('/cliente/:id', ClienteController.clientePorId);

// consultar cliente por nome
routes.get('/cliente/nome/:nome_cliente', ClienteController.clientePorNome);


/* PEDIDOS */

// incluir pedido e pedidos_produto
routes.post('/pedido/', PedidoController.incluirPedido)

// atualizar status pedido
// routes.put('/pedido/:id/:situacao_pedido', PedidoController.atualizarPedido)
routes.put('/pedido/:id', PedidoController.atualizarPedido)

// consultar pedido por status
routes.get('/pedido/status/:situacao_pedido', PedidoController.consultarPorStatus)

// consultar pedido por id
routes.get('/pedido/:id', PedidoController.consultarPorId)

// listar pedidos
routes.get('/pedidos', PedidoController.listarPedidos)


/* PRODUTOS */

// incluir produto
routes.post('/produto', ProdutoController.incluirProduto);

// routes.post('/produto/upload/:id', upload.single('file'), ProdutoController.uploadImagemProduto);

// listar produtos
routes.get('/produtos', ProdutoController.listarProduto);

// consultar produto por id
routes.get('/produto/:id', ProdutoController.consultarPorId)



module.exports = routes;