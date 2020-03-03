const { Model, DataTypes } = require('sequelize');
const PedidoProduto = require("../models/PedidoProduto");

class Produto extends Model {
    static init(sequelize) {
        super.init({
            categoria: DataTypes.INTEGER,
            nome_produto: DataTypes.STRING,
            descricao: DataTypes.STRING,
            img: DataTypes.STRING,
            preco_produto: DataTypes.DOUBLE,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsToMany(models.Pedido, {
            foreignKey: 'id_produto',
            through: PedidoProduto,
            as: 'pedidos'
        });
    }
}

module.exports = Produto;