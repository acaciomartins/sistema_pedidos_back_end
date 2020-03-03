const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");
const Cliente = require("../models/Cliente");

module.exports = {
    async incluirPedido(req, res) { // Gera senha aleatoria - paleativo
        const senha = Math.floor((Math.random() * 200) + 1);
        req.body.senha_pedido = senha;

        const pedido = await Pedido.create(req.body);
        const { lista_produtos } = req.body;

        lista_produtos.map(element => {
            Produto.findByPk(element.id_produto).then(produto => {
                console.log('element.quantidade_produto: ', element.quantidade_produto);
                pedido.addProduto(produto, {
                    through: {
                        quantidade: element.quantidade_produto
                    }
                });
            }).catch(erro => {
                console.error('erro: ', erro);
            });
        });

        var io = req.app.get('socketio');
        io.emit('pedido-realizado', true);

        return res.json(pedido);
    },

    async atualizarPedido(req, res) {
        const { id } = req.params;
        const { situacao_pedido } = req.body;

        const pedido = await Pedido.update({
            situacao_pedido
        }, {
            where: {
                id: id
            }
        });

        return res.json(pedido);
    },

    async consultarPorId(req, res) {
        const { id } = req.params;
        console.log('id: ', id);

        const pedido = await Pedido.findByPk(id, {
            include: { association: 'produtos', through: { attributes: [] } }
            // include: { association: 'produtos'}
        })

        return res.json(pedido);
    },

    async consultarPorStatus(req, res) {
        const { situacao_pedido } = req.params;

        const pedido = await Pedido.findAll({
            where: {
                situacao_pedido
            },
            include: [{
                model: Cliente,
                association: 'cliente'
            },
            { association: 'produtos' }
                // { association: 'produtos', through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.json(pedido);
    },

    async listarPedidos(req, res) {
        let pedidos = await Pedido.findAll({
            include: { association: 'produtos', through: { attributes: [] } }
        });
        return res.json(pedidos);
    },
}