const {Model, DataTypes} = require('sequelize');

class PedidoProduto extends Model {
    static init(sequelize) {
        super.init({
            quantidade: DataTypes.INTEGER
        }, {sequelize, modelName: 'pedidoProduto'})
    }
}

module.exports = PedidoProduto;
