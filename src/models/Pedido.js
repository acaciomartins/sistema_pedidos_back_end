const { Model, DataTypes } = require('sequelize');
const PedidoProduto = require("../models/PedidoProduto");

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            id_cliente: DataTypes.INTEGER,
            situacao_pedido: DataTypes.INTEGER,
            senha_pedido: DataTypes.INTEGER,
            valor_total: DataTypes.DOUBLE
        }, { sequelize })
    }

    static associate(models) {
        this.belongsToMany(models.Produto, {
            foreignKey: 'id_pedido',
            through: PedidoProduto,
            as: 'produtos'
        });
        this.belongsTo(models.Cliente, {
            foreignKey: 'id_cliente',
            as: 'cliente'
        });

    }
}

module.exports = Pedido;