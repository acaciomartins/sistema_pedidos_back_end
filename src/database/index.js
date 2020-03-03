const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
// Models
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');
const PedidoProduto = require('../models/PedidoProduto');

const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Produto.init(connection);
Pedido.init(connection);
PedidoProduto.init(connection);

// Associacoes
Produto.associate(connection.models);
Pedido.associate(connection.models);
Cliente.associate(connection.models);


module.exports = connection;