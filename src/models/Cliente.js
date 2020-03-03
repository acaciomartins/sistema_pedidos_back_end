const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
    static init(sequelize) {
        super.init({
            nome_cliente: DataTypes.STRING,
            telefone_cliente: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Pedido, {

            foreignKey: 'id_cliente',
            as: 'pedidos'
        });
    }
}

module.exports = Cliente;